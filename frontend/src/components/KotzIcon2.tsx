import React, { SVGProps, useState } from "react";
import "snapsvg-cjs";
declare const Snap: any;

const KotzIcon = (props: SVGProps<SVGSVGElement>) => {
  const [isOriginal, setIsOriginal] = useState(true);
  const origPath = "M.587 142.891c2.623 3.611 66.84-51.562 82.652-51.562s36.128 50.42 42.456 51.674-2.718-51.225 4.523-51.674c7.241-.45 56.007 53.133 59.162 51.693s-37.04-58.803-34.779-61.908c2.262-3.106 35.121.449 34.95-3.555s-40.822-12.441-41.715-21.777S183.051 3.322 178.091.216s-46.523 41.347-54.638 39.57-14.007-28.008-17.618-28.008-2.261 22.676-4.96 23.125-27.1-28.008-30.256-27.128c-3.154.879 16.25 32.46 10.833 34.237s-56.235-32.18-58.25-29.336c-3.154 4.453 31.605 27.128 30.712 46.68-.893 19.55-55.55 80.466-53.29 83.572z";

  React.useEffect(() => {
    const s = Snap("#kotzIcon");
    const myPath = s.select("#kotzPath");
    const togglePathAnimation = () => {
      if (myPath) {
        let spreadPath =
          "M.587 142.891c2.623 3.611 66.84-51.562 82.652-51.562s36.128 50.42 42.456 51.674-2.718-51.225 4.523-51.674c7.241-.45 56.007 53.133 59.162 51.693s-37.04-58.803-34.779-61.908c2.262-3.106 35.121.449 34.95-3.555s-40.822-12.441-41.715-21.777S183.051 3.322 178.091.216s-46.523 41.347-54.638 39.57-14.007-28.008-17.618-28.008-2.261 22.676-4.96 23.125-27.1-28.008-30.256-27.128c-3.154.879 16.25 32.46 10.833 34.237s-56.235-32.18-58.25-29.336c-3.154 4.453 31.605 27.128 30.712 46.68-.893 19.55-55.55 80.466-53.29 83.572z";
        const newPathData = isOriginal ? origPath : spreadPath;
        myPath.animate(
          {
            d: newPathData,
          },
          1000,
          function () {
            setIsOriginal(!isOriginal);
          }
        );
      }
    };

    s.click(togglePathAnimation);
  }, [isOriginal]);

  return (
    <svg
      id="kotzIcon"
      xmlns="http://www.w3.org/2000/svg"
      // width="1em"
      // height="1em"
      fill="none"
      viewBox="0 0 200 200"
      {...props}
    >
      <path
        id="kotzPath"
        fill="whitesmoke"
        d={origPath}
        // d="M0 0 L100 100"
      />
    </svg>
  );
};
export default KotzIcon;
