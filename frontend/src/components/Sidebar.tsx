import React, { RefObject, useEffect, useRef, useState } from "react";
import styles from "../styles/Sidebar.module.css";
import provocationStyles from '../styles/ProvocationPage.module.css';
import { ItemArticle } from "../types/itemArticle";
import { Article, Term } from "../interfaces";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import * as C from "../constants";

import JsonBlocksContent from "../JsonBlocksContent";
import ArticleComponent from "../ArticleComponent";
import { useOpenArticle } from "../OpenArticleContext";
import topArrowImg from "../images/other/up-arrow.svg";

interface SidebarProps {
  articles: Article[];
  terms: Term[];
}

function debounce(func: any, wait: number) {
  let timeout: any;

  return function exectuedFunction(...args: any) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function useResizeObservers(refs: any, dependency: number | null) {
  const [dimensions, setDimensions] = useState([]);

  useEffect(() => {
    const handleResize = debounce(() => {
      setDimensions(
        refs.current.map((ref: any) => {
          return ref
            ? {
                width: ref.clientWidth,
                height: ref.clientHeight,
              }
            : { width: 0, height: 0 };
        })
      );
    }, 1000);

    const resizeObservers = refs.current.map((ref: any, index: number) => {
      const observer = new ResizeObserver(() => {
        handleResize();
        setTimeout(() => {
          handleResize();
        }, 2000);
      });
      if (ref) observer.observe(ref);
      return observer;
    });

    window.addEventListener("resize", handleResize);

    handleResize();
    setTimeout(() => {
      handleResize();
    }, 3000);

    return () => {
      resizeObservers.forEach((observer: any, index: number) => {
        if (refs.current[index]) observer.unobserve(refs.current[index]);
      });
    };
  }, [refs, dependency]);

  return dimensions;
}

const Sidebar: React.FC<SidebarProps> = ({ articles, terms }) => {
  const navigate = useNavigate();
  const { urlSuffix } = useParams<{ urlSuffix: string }>();
  const location = useLocation();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dimensions = useResizeObservers(accordionRefs, activeIndex);

  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textContentHeights = useRef<(number | null)[]>([]);
  const textContentWidths = useRef<(number | null)[]>([]);

  const { isOpen, setOpen } = useOpenArticle();

  const scrollToTop = () => {
    if (activeIndex !== null) {
      panelRefs.current[activeIndex]?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);

  const scrollHandler = (panel: HTMLDivElement | null) => {
    const scrolled = (panel?.scrollTop ?? 0) > 300;
    setIsScrolled(scrolled);
  };

  useEffect(() => {
    if (activeIndex !== null) {
      scrollHandler(panelRefs.current[activeIndex]);
    }

    const addScrollEventListener = (panel: any) => {
      panel.addEventListener("scroll", () => scrollHandler(panel));

      return () => panel.removeEventListener("scroll", scrollHandler);
    };

    const panel = panelRefs.current[activeIndex!];
    if (panel) {
      const cleanup = addScrollEventListener(panel);

      return cleanup;
    }
  }, [activeIndex]);

  useEffect(() => {
    let index = articles.findIndex(
      (article) => normalizeTitle(article.attributes.url_title) === urlSuffix
    );

    if (index === -1) {
      index = articles.findIndex(
        (article) => normalizeTitle(article.attributes.title) === urlSuffix
      );
    }
    if (urlSuffix && index !== -1) {
      setActiveIndex(index);
      setOpen(true);
    } else {
      setActiveIndex(null);
      setOpen(false);
    }
  }, [urlSuffix, setOpen, articles, location]);

  const toggleAccordion = (index: number) => {
    const isArticleOpen = activeIndex === index;
    setActiveIndex(isArticleOpen ? null : index);
    setOpen(!isArticleOpen);
    setIsScrolled(isScrolled && isArticleOpen);

    if (!isArticleOpen) {
      const normalizedTitle = normalizeTitle(articles[index].attributes.title);
      const normalizedUrl = normalizeTitle(
        articles[index].attributes.url_title
      );

      const newUrlSuffix = normalizedUrl ? normalizedUrl : normalizedTitle;
      navigate(`/provocation/${newUrlSuffix}`, { replace: false });
    } else {
      navigate(`/provocation`, { replace: false });
    }

    if (activeIndex !== index) {
      setTimeout(() => {
        accordionRefs.current[index]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);
    }
  };

  const normalizeTitle = (title: string | undefined) => {
    return title?.toLowerCase().replace(/[^א-ת0-9a-z]+/g, "-");
  };

  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(null);
    }

    const heights = accordionRefs.current.map(
      (accordion) =>
        accordion?.querySelector<HTMLElement>(`.${styles.textContent}`)
          ?.clientHeight ?? 0
    );
    textContentHeights.current = heights;

    const widths = accordionRefs.current.map(
      (accordion) =>
        accordion?.querySelector<HTMLElement>(`.${styles.textContent}`)
          ?.clientWidth ?? 0
    );
    textContentWidths.current = widths;
  }, [articles, isOpen]);

  return (
    <div className={styles.outer}>
      <div className={styles.nav}>
        {articles.map((article, index) => (
          <div
            key={index}
            className={`${styles.navItem} ${
              activeIndex === index ? styles.activeNavItem : ""
            }`}
            onClick={() => toggleAccordion(index)}
          >
            {article.attributes.title}
          </div>
        ))}
      </div>
      <div
        className={`${styles.articles} ${
          isOpen ? styles.isOpen : styles.isNotOpen
        }`}
      >
        {articles.map((article, index) => {
          const attr = article.attributes;

          return (
            <div
              key={article.id}
              ref={(el) => (panelRefs.current[index] = el)}
              className={`${styles.articleOuter} ${
                activeIndex === index ? styles.active : styles.notActive
              }`}
            >
              <ArticleComponent article={article} terms={terms} styles={provocationStyles}/>
            </div>
          );
        })}
        <div
          className={`${styles.toTop} ${isScrolled ? styles.scrolled : ``}`}
          onClick={() => scrollToTop()}
        >
          <img className={styles.topArrow} src={topArrowImg} alt="top" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
