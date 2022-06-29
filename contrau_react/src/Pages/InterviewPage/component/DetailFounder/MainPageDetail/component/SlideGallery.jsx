import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img2014_1 from "../../../../../../assets/interview-img/2014-1.png";
import img2014_1mb from "../../../../../../assets/interview-img/2014-1mb.png";
import img2014_1cl from "../../../../../../assets/interview-img/2014-1cl.png";
import img2014_2 from "../../../../../../assets/interview-img/2014-2.png";
import img2014_2mb from "../../../../../../assets/interview-img/2014-2mb.png";
import img2014_3 from "../../../../../../assets/interview-img/2014-3.png";
import img2014_3mb from "../../../../../../assets/interview-img/2014-3mb.png";
import img2014_4 from "../../../../../../assets/interview-img/2014-4.png";
import img2014_4mb from "../../../../../../assets/interview-img/2014-4mb.png";

import img2016_1 from "../../../../../../assets/interview-img/2016-1.png";
import img2016_2 from "../../../../../../assets/interview-img/2016-2.png";
import img2016_3 from "../../../../../../assets/interview-img/2016-3.png";
import { Box, useMediaQuery, useTheme } from "@material-ui/core";
import { collection, wasClick } from "./ChangeImage.js";
import { interviewServices } from "../../../../../../services/interviewService";
import { useParams } from "react-router-dom";
SlideGallery.propTypes = {};

function SlideGallery({ detailFounder }) {
  const slidedata = {
    data: [
      {
        key: "2014",
        title: "2014",
        url: img2014_1,
      },
      {
        key: "2016",
        title: "2016",
        url: img2014_1,
      },
      {
        key: "2018",
        title: "2018",
        url: img2014_1,
      },
      {
        key: "2020",
        title: "2020",
        url: img2014_1,
      },
      {
        key: "2022",
        title: "2022",
        url: img2014_1,
      },
    ],
  };
  const slidedata2 = {
    data: [
      {
        key: "2014-2",
        title: "2014-2",
        url: img2014_1cl,
      },
      {
        key: "2016-2",
        title: "2016-2",
        url: img2014_1cl,
      },
      {
        key: "2018-2",
        title: "2018-2",
        url: img2014_1cl,
      },
      {
        key: "2020-2",
        title: "2020-2",
        url: img2014_1cl,
      },
      {
        key: "2022-2",
        title: "2022-2",
        url: img2014_1cl,
      },
    ],
  };
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  async function getAPIGallery() {
    try {
      let _listGallery = await interviewServices.getGallery();
      return _listGallery;
    } catch (error) {
      console.log("Failed to fetch", error);
    }
  }
  const [ClickSlide, setClickSlide] = useState(slidedata);

  const [urlImg, seturlImg] = useState(img2014_1);

  const changeColor = () => {
    // CHANGE ADD COLOR
    let addColorImg1 = (document
      .querySelector(".slick-active")
      .getElementsByClassName("frameimgtop")[0]
      .getElementsByClassName("frameimg1")[0]
      .getElementsByTagName("img")[0].src = img2014_1cl);
    // CHANGE NO COLOR
    let element2 = document.querySelectorAll(".slick-slide:not(.slick-active)");
    for (var i = 0; i < element2.length; i++) {
      let element3 = (element2[i]
        .getElementsByClassName("frameimgtop")[0]
        .getElementsByClassName("frameimg1")[0]
        .getElementsByTagName("img")[0].src = img2014_1);
    }
  };
  // GET LIST ALL GALLERY
  async function getGalleryFounderList() {
    try {
      let listGalleryFounder = await interviewServices.getAllGallery();
      return listGalleryFounder;
    } catch (error) {
      console.log("Failed to fetch", error);
    }
  }
  // GET DETAIL GALLERY
  async function getGalleryFounderDetail(id) {
    try {
      let detailgallery = await interviewServices.getGalleryFounder(id);
      return detailgallery;
    } catch (error) {
      console.log("Failed to fetch", error);
    }
  }
  useEffect(() => {
    // changeColor();
    async function fechData() {
      // FIND ID FROM LIST ALL GALLERY
      let listfoundergallery = await getGalleryFounderList();
      console.log(
        "listfoundergallery:",
        listfoundergallery.data[0].acf.first_name
      );
      var findID = await Object.values(listfoundergallery.data).find(
        (element) =>
          element.acf.first_name == detailFounder.acf.first_name &&
          element.acf.last_name == detailFounder.acf.last_name
      );
      console.log("findID:", findID.id);
      // HAVE ID ==> TO GET API DETAIL GALLERY OF FOUNDER
      let detailfoundergallery = await getGalleryFounderDetail(findID.id);
      console.log("detailfoundergallery:", detailfoundergallery.data.acf.image);
      // setClickSlide(detailfoundergallery.data);
    }
    fechData();
  }, []);

  const settings = {
    dots: true,
    vertical: true,
    slidesToShow: 1, //when add/edit css img(item)/per slide ==> height change ==> reset to 0 and to 1
    slidesToScroll: 1,
    verticalSwiping: true,
    arrows: false,
    speed: 1000,
    // beforeChange: (current, next) => changeColorBlack(),
    // afterChange: (current) => setClickSlide(slidedata2),
    afterChange: (current) => changeColor(),

    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>;
    },
    customPaging: (i) => <div>{slidedata.data[i].key}</div>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {},
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          vertical: false,
          verticalSwiping: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          vertical: false,
          verticalSwiping: false,
        },
      },
    ],
  };

  const bannerData = ClickSlide.data.map((item) => (
    <div key={item.key} className="carousel-gallery">
      {!isMatch && (
        <div
          className={
            item.key == "2014" || item.key == "2018" || item.key == "2022"
              ? "frameimgmain"
              : "frameimgmain2"
          }
        >
          {/* <div>
            <img src={urlImg} className="imgtest" />
          </div> */}
          <div className="frameimgtop">
            <div className="frameimg1">
              <img
                src={
                  item.key == "2014" || item.key == "2018" || item.key == "2022"
                    ? img2014_1
                    : img2016_1
                }
              />
            </div>
            <div className="frameimg2">
              <img
                src={
                  item.key == "2014" || item.key == "2018" || item.key == "2022"
                    ? img2014_2
                    : img2016_2
                }
              />
            </div>
          </div>

          <div className="frameimgbot">
            <Box className="frameimg3">
              <img
                src={
                  item.key == "2014" || item.key == "2018" || item.key == "2022"
                    ? img2014_3
                    : img2016_3
                }
              />
            </Box>
            <Box className="frameimg4">
              <img src={img2014_4} />
            </Box>
          </div>
        </div>
      )}

      {/* MOBILE */}
      {isMatch && (
        <div className="frameimgmain">
          <div className="frameimgtop">
            <div className="frameimg1">
              <img src={img2014_1mb} />
            </div>
            <div className="frameimg2">
              <img src={img2014_2mb} />
            </div>
          </div>

          <div className="frameimgbot">
            <Box className="frameimg3">
              <img src={img2014_3mb} />
            </Box>
            <Box className="frameimg4">
              <img src={img2014_4mb} />
            </Box>
          </div>
        </div>
      )}
      <div className="frametitleyear">
        <div className="titleyeardetail">{item.title}</div>
        <div className="detailtitle">
          Nathon and his staff at the industry's first year-end gala show
        </div>
      </div>
    </div>
  ));
  return (
    <div>
      <Slider {...settings}>{bannerData}</Slider>
    </div>
  );
}

export default SlideGallery;
