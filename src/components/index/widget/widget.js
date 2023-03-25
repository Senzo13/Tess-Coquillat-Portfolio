import { scrollToTop } from "../../../utils/utils.scrollToTop";
import { FiChevronUp } from "react-icons/fi";

export default function Widget() {
  return (
    <>
      <div className="social">
        <div className="social_icon">
          <a href="https://www.linkedin.com/in/tess-coquilhat-9572b2159/?originalSubdomain=fr">
            <object
              data="/assets/widget/social/picto-linkedin.svg"
              width="100%"
              height="100%"
              type="image/svg+xml"
            />
          </a>
        </div>
        <div className="social_icon">
          <a href="https://fr.malt.be/profile/tesscoquilhat">
            <object
              data="/assets/widget/social/picto-malt.svg"
              type="image/svg+xml"
            />
          </a>
        </div>

        <div className="social_icon">
          <a href="https://www.instagram.com/tess_coquilhat/?hl=fr">
            <object
              data="/assets/widget/social/picto-instagram.svg"
              type="image/svg+xml"
            />
          </a>
        </div>

        <div className="social_icon">
          <a href="https://id.pinterest.com/tesscoquilhat0307/">
            <object
              data="/assets/widget/social/picto-pinterest.svg"
              type="image/svg+xml"
            />
          </a>
        </div>

        <div className="social_icon" style={{ cursor: "pointer" }}>
          <a href="https://www.behance.net/tesscoquil94e6">
            <object
              data="/assets/widget/social/picto-behance.svg"
              type="image/svg+xml"
            />
          </a>
        </div>
      </div>

      {/* ARROW */}
      <div className="widget-arrow" onClick={scrollToTop}>
        <button className="widget-design">
          <FiChevronUp style={{ transform: "scale(1.5)" }} />
        </button>
      </div>
    </>
  );
}
