import Profil from "./content/profil";
import Portfolio from "./content/portfolio";
import Customer from "./content/customer";
import Analytics from "./content/analytics";
export default function Content({ props }) {
  const nav = Object.values(props).filter((item) => {
    if (item.isSelect) {
      return item.element;
    }
  });

  const elements = new Array(nav[0].element);

  const showContentByName = (name) => {
    switch (name) {
      case "Profil":
        return <Profil />;
      case "Portfolio":
        return <Portfolio />;
      case "Avis":
        return <Customer />;
      case "Analytics":
        return <Analytics />;
      case "Paramètres":
        return (
          <>
            <div className="flex flex-col w-full justify-center items-center p-10">
              <label className="flex justify-center m-4">
                Désolé cette page est encore en construction ...
              </label>

              <img
                className="rounded-[15px]"
                src="https://media.tenor.com/BbfKJfP43RwAAAAM/jackhanmer-construction-worker.gif"
                alt="construction"
              />
            </div>
          </>
        );
      default:
        return "";
    }
  };

  return (
    <>
      <div className="bg-[#F1F5F9] h-screen overflow-y-auto">
        <div className="content_parent">
          {elements.fill("").map((_, i) => {
            return (
              <div
                className="content rounded-[15px]"
                key={i}
                style={{
                  width: nav[0].size.width,
                  height: nav[0].size.height,
                  boxShadow:
                    nav[0].text == "Avis"
                      ? "none"
                      : "0 0 8px rgba(0, 0, 0, 0.2196078431), 0 0 2px rgba(0, 0, 0, 0.384)",
                }}
              >
                {showContentByName(nav[0].text)}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
