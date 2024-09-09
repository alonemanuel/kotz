// Sidebar.tsx

import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Sidebar.module.css";
import provocationStyles from "../styles/ProvocationPage.module.css";
import dayafterStyles from "../styles/DayafterPage.module.css";
import { Article, Term } from "../interfaces";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ArticleComponent from "../ArticleComponent";
import { useOpenArticle } from "../OpenArticleContext";
import topArrowImg from "../images/other/up-arrow.svg";
import tagImg from "../images/sandbox/tag_example.svg";
import { path } from "snapsvg";

// Function to dynamically require all images from a directory
const importAll = (r: any) => {
  return r.keys().map(r);
};

// Import all images from the sandbox directory
const homepageImages = importAll(
  require.context("../images/homepage_images", false, /\.(png|jpe?g|svg)$/)
);

interface SidebarProps {
  articles: Article[];
  terms: Term[];
  path: any;
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

const Sidebar: React.FC<SidebarProps> = ({ articles, terms, path }) => {
  const getMaxArticles = (width: number) => {
    if (path === "thedayafter") {
      return 1;
    }

    if (width >= 1250) return 3;
    if (width >= 850) return 2;
    return 1;
  };

  // Add touch class
  document.documentElement.classList.toggle(
    styles.touch,
    "ontouchstart" in document.documentElement
  );

  document.documentElement.classList.toggle(
    styles.noTouch,
    !("ontouchstart" in document.documentElement)
  );

  document.documentElement.classList.toggle(
    provocationStyles.touch,
    "ontouchstart" in document.documentElement
  );

  document.documentElement.classList.toggle(
    provocationStyles.noTouch,
    !("ontouchstart" in document.documentElement)
  );

  const [maxArticles, setMaxArticles] = useState(
    getMaxArticles(window.innerWidth)
  );

  const updateOpenArticlesProperty = (openArticles: number) => {
    document.documentElement.style.setProperty(
      "--open-articles",
      openArticles.toString()
    );
  };

  useEffect(() => {
    const handleResize = () => {
      const newMaxArticles = getMaxArticles(window.innerWidth);
      setMaxArticles(newMaxArticles);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { isOpen, setOpen } = useOpenArticle();

  const homepageImagesRef = useRef<HTMLDivElement>(null);

  const getNearRandomPosition = (
    maxDelta: number,
    x: number,
    y: number
  ): { newX: number; newY: number } => {
    const newX = x + Math.floor((2 * Math.random() - 1) * maxDelta);
    const newY = y + Math.floor((2 * Math.random() - 1) * maxDelta);
    return { newX, newY };
  };

  function dragElement(elmnt: HTMLElement) {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    const dragMouseDown = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      // Determine whether the event is a touch event
      if (e.type === "touchstart" && e instanceof TouchEvent) {
        // Use the first touch point
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
      } else if (e instanceof MouseEvent) {
        // Use the mouse event for non-touch devices
        pos3 = e.clientX;
        pos4 = e.clientY;
      }
      document.onmouseup = closeDragElement;
      document.ontouchend = closeDragElement;
      document.onmousemove = (e) => elementDrag(e);
      document.ontouchmove = (e) => elementDrag(e);
    };

    const elementDrag = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      // Determine whether the event is a touch event
      if (e.type === "touchmove" && e instanceof TouchEvent) {
        // Use the first touch point for touch devices
        pos1 = pos3 - e.touches[0].clientX;
        pos2 = pos4 - e.touches[0].clientY;
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
      } else if (e instanceof MouseEvent) {
        // Use the mouse event for non-touch devices
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
      }
      // Set the element's new position
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    };

    const closeDragElement = () => {
      // Stop moving when mouse button is released or touch ends
      document.onmouseup = null;
      document.ontouchend = null;
      document.onmousemove = null;
      document.ontouchmove = null;
    };

    // Add event listeners for both mouse and touch events
    elmnt.addEventListener("mousedown", dragMouseDown);
    elmnt.addEventListener("touchstart", dragMouseDown);
  }

  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const getRandomPosition = async (
    element: HTMLElement
  ): Promise<{ x: number; y: number }> => {
    const container = homepageImagesRef.current;
    if (container) {
      await timeout(300);

      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      const containerWidth = containerRect.width - 1.5 * elementRect.width;
      const containerHeight = containerRect.height - 1.5 * elementRect.height;

      const { newX, newY } = getNearRandomPosition(
        20,
        Math.random() * containerWidth,
        Math.random() * containerHeight
      );

      return {
        x: elementRect.width / 2 + newX,
        y: newY + elementRect.height / 2,
      };
    }
    return { x: 0, y: 0 };
  };

  useEffect(() => {
    if (homepageImagesRef.current) {
      const homepageImages = Array.from(homepageImagesRef.current?.children);
      homepageImages.forEach((item, index) => {
        const htmlItem = item as HTMLElement;
        dragElement(htmlItem);
        getRandomPosition(htmlItem).then(({ x, y }) => {
          htmlItem.style.setProperty("--top", `${y}px`);
          htmlItem.style.setProperty("--left", `${x}px`);

          const animationDuration = Math.random() * 5 + 3; // Random duration between 3 and 8 seconds
          const animationDelay = Math.random() * 2; // Random delay up to 2 seconds
          const translateYStart = Math.random() * 20 - 10; // Random start position from -10px to 10px
          const translateYEnd = Math.random() * 20 - 10; // Random end position from -10px to 10px
          const translateXStart = Math.random() * 20 - 10; // Random start position from -10px to 10px
          const translateXEnd = Math.random() * 20 - 10; // Random end position from -10px to 10px

          htmlItem.style.setProperty(
            "--animation-duration",
            `${animationDuration}s`
          );
          htmlItem.style.setProperty("--animation-delay", `${animationDelay}s`);
          htmlItem.style.setProperty(
            "--translate-y-start",
            `${translateYStart}px`
          );
          htmlItem.style.setProperty("--translate-y-end", `${translateYEnd}px`);
          htmlItem.style.setProperty(
            "--translate-x-start",
            `${translateXStart}px`
          );
          htmlItem.style.setProperty("--translate-x-end", `${translateXEnd}px`);
        });
      });
    }
  }, []);

  const navigate = useNavigate();
  const { urlSuffix } = useParams<{ urlSuffix: string }>();
  const location = useLocation();

  const [isNavClicked, setIsNavClicked] = useState(false);

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
          if (newIndices.length > maxArticles) {
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

  useEffect(() => {
    updateOpenArticlesProperty(activeIndices.length);
  }, [activeIndices]);

  const toggleAccordion = (index: number) => {
    setIsNavClicked(true);
    const nav: HTMLDivElement | null = document.querySelector(`.${styles.nav}`);
    if (!nav) return;

    nav.style.setProperty("--touch-max-width", `10vw`);
    setTimeout(() => {
      setIsNavClicked(false);
    }, 500);

    setActiveIndices((prevIndices) => {
      const isArticleOpen = prevIndices.includes(index);
      let newIndices = isArticleOpen
        ? prevIndices.filter((i) => i !== index)
        : [index, ...prevIndices];
      if (newIndices.length > maxArticles) {
        newIndices.pop();
      }
      return newIndices;
    });
    setOpen(true);

    if (!isPortrait) {
      if (!activeIndices.includes(index)) {
        const normalizedTitle = normalizeTitle(
          articles[index].attributes.title
        );
        const normalizedUrl = normalizeTitle(
          articles[index].attributes.url_title
        );

        const newUrlSuffix = normalizedUrl ? normalizedUrl : normalizedTitle;
        navigate(`/${path}/${newUrlSuffix}`, { replace: false });
      } else if (activeIndices.length === 1) {
        navigate(`/${path}`, { replace: false });
      }
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
      navigate(`/${path}`, { replace: false });
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

  // Add scroll event listener to update active article based on scroll position

  useEffect(() => {
    const handleScroll = (parent: any) =>
      // console.debug(`alon: handle scroll is called`); // ALON REMOVE
      debounce(() => {
        // console.debug(`alon: going over func`); // ALON REMOVE
        {
          if (isPortrait) {
            const articleElements = panelRefs.current;
            const viewportHeight = window.innerHeight;
            const parentRect = parent.getBoundingClientRect();

            let found = false;
            for (let i = 0; i < articleElements.length; i++) {
              const el = articleElements[i];
              if (
                el &&
                articles &&
                articles[i] &&
                articles[i].attributes &&
                articles[i].attributes.type !== "popout"
              ) {
                const rect = el.getBoundingClientRect();
                // Check if child is within the visible area of the parent
                const isVisible =
                  rect.left + rect.width / 2 >= parentRect.left &&
                  rect.right - rect.width / 2 <= parentRect.right;

                // if (rect.top >= 0 && rect.top < viewportHeight / 2) {
                if (isVisible) {
                  setActiveArticleIndex(i);
                  setLastOpenedIndex(i);

                  const normalizedTitle = normalizeTitle(
                    articles[i].attributes.title
                  );
                  const normalizedUrl = normalizeTitle(
                    articles[i].attributes.url_title
                  );
                  const newUrlSuffix = normalizedUrl
                    ? normalizedUrl
                    : normalizedTitle;

                  navigate(`/${path}/${newUrlSuffix}`, { replace: false });

                  found = true;
                  break;
                }
              }
            }

            if (!found) {
              // If no element is found in the viewport, reset the active article
              setActiveArticleIndex(null);
              setLastOpenedIndex(null);
            }
          }
        }
      }, 100);

    const articlesDiv = document.querySelector(`.${styles.articles}`);

    let foo = () => {};

    if (articlesDiv) {
      foo = handleScroll(articlesDiv);
      articlesDiv.addEventListener("scroll", foo, {
        once: false,
      });
    }

    return () => {
      if (articlesDiv) {
        articlesDiv.removeEventListener("scroll", foo);
      }
    };
  }, [articles]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const touchStartX = touch.clientX;
    panelRefs.current[0]?.setAttribute(
      "data-touch-start-x",
      touchStartX.toString()
    );
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    console.debug(`alon: touch move??`); // ALON REMOVE
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
            "--alt-color": `${article.attributes.alt_color}`,
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

  console.debug(`alon: articles: alonaiiii`); // ALON REMOVE
  console.log(articles);

  return (
    <div
      className={`${styles.outer} ${
        path === "thedayafter" ? styles.dayafter : styles.provocation
      }`}
    >
      <div
        className={`${styles.nav} ${
          isNavClicked ? styles.temporaryClosed : ""
        }`}
        style={
          {
            "--active-theme-color": `${
              articles[isPortrait ? activeArticleIndex ?? 0 : activeIndices[0]]
                ?.attributes.color
            }`,
            "--active-alt-color": `${
              articles[isPortrait ? activeArticleIndex ?? 0 : activeIndices[0]]
                ?.attributes.alt_color
            }`,
          } as React.CSSProperties
        }
      >
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
                "--alt-color": `${article.attributes.alt_color}`,
              } as React.CSSProperties
            }
          >
            <div className={styles.navContentContainer}>
              <div className={styles.navContent}>
                {article.attributes.title}
              </div>
            </div>
            {article.attributes.type !== "popout" && (
              <div className={styles.navTag}>
                <img
                  src={
                    article.attributes.tag_icon?.data
                      ? article.attributes.tag_icon?.data?.attributes.url
                      : tagImg
                  }
                  alt=""
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        className={`${styles.articles} ${
          isOpen ? styles.isOpen : styles.isNotOpen
        }`}
      >
        {isPortrait
          ? articles.map((article, index) => renderArticle(article, index))
          : activeIndices.slice(0, maxArticles).map((activeIndex) => {
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
      <div
        className={`${styles.homepageImages} ${
          isOpen ? styles.isOpen : styles.isNotOpen
        }`}
        ref={homepageImagesRef}
      >
        {homepageImages.map((imageSrc: string, index: number) => (
          <div key={index} className={styles.homepageImage}>
            <img src={imageSrc} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
