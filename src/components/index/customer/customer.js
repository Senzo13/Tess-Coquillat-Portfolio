import { useEffect, useState } from "react";
import { GetCustomer } from "../../../services/panel/customer/functions.getCustomer";
import Script from "next/script";
import Image from "next/image";
function Customer() {
  const [customer, setCustomer] = useState([]);
  useEffect(() => {
    function owlCarousel() {
      $(".owl-carousel").owlCarousel({
        loop: true, // true or false
        margin: 10, // 10px
        nav: true, // Show next and prev buttons
        items: 3, // The number of items you want to see on the screen.
        autoplay: true, // true or false
        autoplayTimeout: 3000, // time in ms
        autoplayHoverPause: true, // true or false

        responsive: {
          0: {
            items: 1,
            nav: false,
          },
          600: {
            items: 1,
            nav: false,
          },
          845: {
            items: 2,
            nav: false,
          },
          1000: {
            items: 3,
            nav: false,
          },
        },
      });
    }
    owlCarousel();

    GetCustomer(24).then((res) => {
      if (res != undefined) {
        setCustomer([]);
        setCustomer(res.data);
      }
    });
  }, [customer.length > 0]);

  return (
    <>
      <Script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        crossorigin="anonymous"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
        strategy="beforeInteractive"
      ></Script>

      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"
        crossorigin="anonymous"
        integrity="sha512-bPs7Ae6pVvhOSiIcyUClR7/q2OAsRiovw4vAkX+zJbw3ShAeeqezq50RIIcIURq7Oa20rW2n2q+fyXBNcU9lrw=="
        // crossOrigin="anonymous"
        // referrerPolicy="no-referrer"
        strategy="beforeInteractive"
      ></Script>
      <div
        className="flex justify-center cursor-pointer justify-end ml-auto w-[96%] m-auto p-2 items-center rounded-[10px] bg-[#E30137]"
        style={{
          color: "WHITE",
          fontFamily: "MADE Tommy Bold, sans-serif",
          fontSize: "26px",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
        alt="ILS ME FONT CONFIANCE" // permet de changer le texte de l'alt pour la div pour le SEO
        title="AVIS CLIENTS"
      >
        AVIS CLIENTS
      </div>
      <div className="gtco-testimonials">
        {customer.length > 0 ? (
          <div
            className="owl-carousel owl-carousel1 owl-theme m-auto"
            style={{ width: "97%", margin: "auto" }}
          >
            {customer.map((item, index) => {
              return (
                <div key={index}>
                  <div className="card text-center shadow-md rounded-[25px] overflow-hidden">
                    <div className="overflow-y-scroll">
                      <div className="card-img-top">
                        <Image
                          src={item.imgUrl}
                          crossOrigin="anonymous"
                          layout="fill"
                          objectFit="cover"
                          blurDataURL={item.imgUrl}
                          placeholder="blur"
                          alt="LOGO"
                        />
                      </div>
                      <div className="card-body ">
                        <h5
                          id="title_size"
                          style={{
                            fontFamily: "MADE Tommy Bold, sans-serif",
                            fontSize: "30px",
                            padding: "0px",
                          }}
                        >
                          {item.entreprise}

                          <br />
                          <span
                            style={{
                              fontFamily: "MADE Tommy Bold, sans-serif",
                              fontSize: "30px",
                              padding: "0px",
                            }}
                          >
                            {" "}
                            {item.nomPrenom}
                          </span>
                        </h5>
                        <p
                          className="card-text"
                          style={{
                            fontSize: "17px",
                            color: "#000000",
                            fontFamily: "MADE Tommy Light, sans-serif",
                          }}
                        >
                          {item.description}
                        </p>
                        <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                          <li style={{ marginRight: "4px" }}>
                            <i className="fas fa-star fa-sm">
                              <img
                                src="https://img.icons8.com/fluency/344/star.png"
                                width="10px"
                                height="10px"
                                style={{ width: "45px", height: "45px" }}
                              />
                            </i>
                          </li>
                          <li style={{ marginRight: "4px" }}>
                            <i className="fas fa-star fa-sm">
                              <img
                                src="https://img.icons8.com/fluency/344/star.png"
                                width="10px"
                                height="10px"
                                style={{ width: "45px", height: "45px" }}
                              />
                            </i>
                          </li>
                          <li style={{ marginRight: "4px" }}>
                            <i className="fas fa-star fa-sm">
                              <img
                                src="https://img.icons8.com/fluency/344/star.png"
                                width="10px"
                                height="10px"
                                style={{ width: "45px", height: "45px" }}
                              />
                            </i>
                          </li>
                          <li style={{ marginRight: "4px" }}>
                            <i className="fas fa-star fa-sm">
                              <img
                                src="https://img.icons8.com/fluency/344/star.png"
                                width="10px"
                                height="10px"
                                style={{ width: "45px", height: "45px" }}
                              />
                            </i>
                          </li>
                          <li>
                            <i className="fas fa-star fa-sm">
                              <img
                                src="https://img.icons8.com/fluency/344/star.png"
                                width="10px"
                                height="10px"
                                style={{ width: "45px", height: "45px" }}
                              />
                            </i>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                // add stars rating here
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Customer;
