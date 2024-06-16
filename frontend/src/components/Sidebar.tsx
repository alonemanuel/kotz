import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Sidebar.module.css";
import provocationStyles from "../styles/ProvocationPage.module.css";
import { Article, Term } from "../interfaces";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ArticleComponent from "../ArticleComponent";
import { useOpenArticle } from "../OpenArticleContext";
import topArrowImg from "../images/other/up-arrow.svg";

interface SidebarProps {
  articles: Article[];
  terms: Term[];
}

function debounce(func: any, wait: number) {
  let timeout: any;

  return function executedFunction(...args: any) {
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

  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );
  const [activeArticleIndex, setActiveArticleIndex] = useState<number | null>(
    null
  );
  const [lastOpenedIndex, setLastOpenedIndex] = useState<number | null>(null);

  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dimensions = useResizeObservers(accordionRefs, activeIndices.length);

  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textContentHeights = useRef<(number | null)[]>([]);
  const textContentWidths = useRef<(number | null)[]>([]);

  const { isOpen, setOpen } = useOpenArticle();

  const scrollToTop = (index: number) => {
    panelRefs.current[index]?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [isScrolled, setIsScrolled] = useState(false);

  const scrollHandler = (panel: HTMLDivElement | null) => {
    const scrolled = (panel?.scrollTop ?? 0) > 300;
    setIsScrolled(scrolled);
  };

  useEffect(() => {
    if (activeIndices.length > 0) {
      scrollHandler(panelRefs.current[activeIndices[0]]);
    }

    const addScrollEventListener = (panel: any) => {
      panel.addEventListener("scroll", () => scrollHandler(panel));

      return () => panel.removeEventListener("scroll", scrollHandler);
    };

    const panel = panelRefs.current[activeIndices[0]];
    if (panel) {
      const cleanup = addScrollEventListener(panel);

      return cleanup;
    }
  }, [activeIndices]);

  useEffect(() => {
    const handleResize = () => {
      const newIsPortrait = window.innerHeight > window.innerWidth;
      if (newIsPortrait !== isPortrait) {
        if (newIsPortrait) {
          // Switching to portrait
          if (activeIndices.length > 0) {
            const lastIndex = activeIndices[0];
            setActiveArticleIndex(lastIndex);
            setLastOpenedIndex(lastIndex);
            setTimeout(() => {
              panelRefs.current[lastIndex]?.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
              });
            }, 0);
          } else {
            // If no articles are open, open the first article in portrait mode
            setActiveArticleIndex(0);
            setLastOpenedIndex(0);
            setTimeout(() => {
              panelRefs.current[0]?.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
              });
            }, 0);
          }
        } else {
          // Switching to landscape
          if (activeArticleIndex !== null) {
            setActiveIndices([activeArticleIndex]);
          }
        }
      }
      setIsPortrait(newIsPortrait);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isPortrait, activeIndices, activeArticleIndex]);

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
      setActiveIndices((prevIndices) => {
        if (prevIndices.includes(index)) {
          return prevIndices;
        } else {
          const newIndices = [index, ...prevIndices];
          if (newIndices.length > 3) {
            newIndices.pop();
          }
          return newIndices;
        }
      });
      setOpen(true);
      setLastOpenedIndex(index);
    } else {
      setActiveIndices([]);
      setOpen(false);
    }
  }, [urlSuffix, setOpen, articles, location]);

  const toggleAccordion = (index: number) => {
    setActiveIndices((prevIndices) => {
      const isArticleOpen = prevIndices.includes(index);
      let newIndices = isArticleOpen
        ? prevIndices.filter((i) => i !== index)
        : [index, ...prevIndices];
      if (newIndices.length > 3) {
        newIndices.pop();
      }
      return newIndices;
    });
    setOpen(true);

    if (!activeIndices.includes(index)) {
      const normalizedTitle = normalizeTitle(articles[index].attributes.title);
      const normalizedUrl = normalizeTitle(
        articles[index].attributes.url_title
      );

      const newUrlSuffix = normalizedUrl ? normalizedUrl : normalizedTitle;
      navigate(`/provocation/${newUrlSuffix}`, { replace: false });
    } else if (activeIndices.length === 1) {
      navigate(`/provocation`, { replace: false });
    }

    // Scroll to the selected article if in portrait mode
    if (isPortrait) {
      panelRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      setActiveArticleIndex(index);
      setLastOpenedIndex(index);
    } else {
      setLastOpenedIndex(index);
    }
  };

  const closeArticle = (index: number) => {
    setActiveIndices((prevIndices) => {
      const newIndices = prevIndices.filter((i) => i !== index);
      return newIndices;
    });

    setActiveArticleIndex(-1);

    if (activeIndices.length === 1) {
      navigate(`/provocation`, { replace: false });
    }
  };

  const normalizeTitle = (title: string | undefined) => {
    return title?.toLowerCase().replace(/[^א-ת0-9a-z]+/g, "-");
  };

  useEffect(() => {
    if (!isOpen) {
      setActiveIndices([]);
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

  useEffect(() => {
    const handleScroll = () => {
      if (isPortrait) {
        const articleElements = panelRefs.current;
        const viewportHeight = window.innerHeight;

        for (let i = 0; i < articleElements.length; i++) {
          const el = articleElements[i];
          const rect = el?.getBoundingClientRect();

          if (rect && rect.top >= 0 && rect.top < viewportHeight / 2) {
            setActiveArticleIndex(i);
            setLastOpenedIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isPortrait]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const touchStartX = touch.clientX;
    panelRefs.current[0]?.setAttribute(
      "data-touch-start-x",
      touchStartX.toString()
    );
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const touchStartX = Number(
      panelRefs.current[0]?.getAttribute("data-touch-start-x")
    );
    const touchEndX = touch.clientX;

    const deltaX = touchEndX - touchStartX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        // Swipe right
        if (activeIndices[0] > 0) {
          toggleAccordion(activeIndices[0] - 1);
        }
      } else {
        // Swipe left
        if (activeIndices[0] < articles.length - 1) {
          toggleAccordion(activeIndices[0] + 1);
        }
      }
      panelRefs.current[0]?.removeAttribute("data-touch-start-x");
    }
  };

  const handleHeaderScroll = (
    entries: IntersectionObserverEntry[],
    index: number
  ) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      panelRefs.current[index]?.classList.remove(styles.scrolled);
    } else {
      panelRefs.current[index]?.classList.add(styles.scrolled);
    }
  };

  useEffect(() => {
    panelRefs.current.forEach((panel, index) => {
      if (panel) {
        const observer = new IntersectionObserver(
          (entries) => handleHeaderScroll(entries, index),
          { threshold: 0 }
        );
        const titleElement = panel.querySelector("header > hgroup > h1");
        if (titleElement) {
          observer.observe(titleElement);
        }
        return () => observer.disconnect();
      }
    });
  }, [panelRefs, articles, activeIndices]);

  const renderArticle = (article: Article, index: number) => {
    return (
      <div
        key={article.id}
        ref={(el) => (panelRefs.current[index] = el)}
        className={`${styles.articleOuter} ${
          article.attributes.type == "popout" ? styles.popout : ""
        } ${
          (
            isPortrait
              ? activeArticleIndex === index
              : activeIndices.includes(index)
          )
            ? styles.active
            : ""
        }`}
        style={
          {
            "--theme-color": `${article.attributes.color}`,
          } as React.CSSProperties
        }
      >
        <div
          className={styles.topBar}
          style={
            {
              "--theme-color": `${article.attributes.color}`,
            } as React.CSSProperties
          }
        >
          <div className={styles.title}>{article.attributes.title}</div>
          <div
            className={styles.xButton}
            onClick={() => closeArticle(index)}
          ></div>
        </div>
        <ArticleComponent
          article={article}
          terms={terms}
          styles={provocationStyles}
        />
      </div>
    );
  };

  return (
    <div className={styles.outer}>
      <div className={styles.nav}>
        {articles.map((article, index) => (
          <div
            key={index}
            className={`${styles.navItem} ${
              (
                isPortrait
                  ? activeArticleIndex === index
                  : activeIndices.includes(index)
              )
                ? styles.activeNavItem
                : ""
            }`}
            onClick={() => toggleAccordion(index)}
            style={
              {
                "--theme-color": `${article.attributes.color}`,
              } as React.CSSProperties
            }
          >
            <div className={styles.navContent}>{article.attributes.title}</div>
          </div>
        ))}
      </div>
      <div
        className={`${styles.articles} ${
          isOpen ? styles.isOpen : styles.isNotOpen
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {isPortrait
          ? articles.map((article, index) => renderArticle(article, index))
          : activeIndices.map((activeIndex) => {
              const article = articles[activeIndex];
              return renderArticle(article, activeIndex);
            })}
        {isOpen && (
          <div
            className={`${styles.toTop} ${isScrolled ? styles.scrolled : ``}`}
            onClick={() => scrollToTop(activeIndices[0])}
          >
            <img className={styles.topArrow} src={topArrowImg} alt="top" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
