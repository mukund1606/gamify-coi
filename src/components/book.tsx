"use client";
import "@/styles/book.css";

import { useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";

import data from "@/data/articlesData.json";

import $ from "jquery";
import Image from "next/image";

export default function Book() {
  const { width, height } = useWindowSize();
  const [isPlayClicked, setIsPlayClicked] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(4);
  const maxLocation = numberOfPages + 1;
  const myArray = new Array(numberOfPages).fill(0);
  const [score, setScore] = useState(0);

  const [randomArticles, setRandomArticles] = useState<
    (
      | {
          article: number;
          title: string;
          description: string;
        }
      | {
          article: string;
          title: string;
          description: string;
        }
    )[]
  >();
  const [randomArticleNumbers, setRandomArticleNumbers] =
    useState<(string | number)[][]>();

  function generateRandomArticles(numberOfPages: number) {
    const randomArticles = data
      .sort(() => Math.random() - Math.random())
      .slice(0, numberOfPages);
    const randomArticleNumbers = data
      .sort(() => Math.random() - Math.random())
      .slice(0, numberOfPages * 3)
      .map((article) => article.article);
    setRandomArticles(randomArticles);
    const randomArticleNumbersArray = [];
    for (let i = 0; i < numberOfPages; i++) {
      randomArticleNumbersArray.push([
        ...randomArticleNumbers.slice(i * 3, i * 3 + 3),
        randomArticles[i].article,
      ]);
    }
    setRandomArticleNumbers(
      randomArticleNumbersArray.map((arr) =>
        arr.sort(() => Math.random() - Math.random())
      )
    );
  }
  function openBook() {
    const book = $("#book");
    const prevBtn = $("#prev-btn");
    const nextBtn = $("#next-btn");
    book.css("transform", "translateX(50%)");
    prevBtn.css("transform", "translateX(-275px)");
    nextBtn.css("transform", "translateX(275px)");
  }

  function closeBook(isAtBeginning: boolean) {
    const book = $("#book");
    const prevBtn = $("#prev-btn");
    const nextBtn = $("#next-btn");
    if (isAtBeginning) {
      book.css("transform", "translateX(0%)");
    } else {
      book.css("transform", "translateX(100%)");
    }

    prevBtn.css("transform", "translateX(0px)");
    nextBtn.css("transform", "translateX(0px)");
  }

  const [isFinished, setIsFinished] = useState(false);

  function goNextPage() {
    if (currentLocation < maxLocation) {
      const paper = $("#p" + currentLocation);
      if (currentLocation === 1) {
        openBook();
        paper.css("z-index", "1");
        paper.addClass("flipped");
      } else if (currentLocation === numberOfPages) {
        paper.css("z-index", numberOfPages);
        paper.addClass("flipped");
        closeBook(false);
      } else {
        paper.css("z-index", currentLocation);
        paper.addClass("flipped");
      }
    }
    setCurrentLocation(currentLocation + 1);
  }

  // function goPrevPage() {
  //   console.log(currentLocation);
  //   if (currentLocation > 1) {
  //     const paper = $("#p" + (currentLocation - 1));
  //     if (currentLocation === 2) {
  //       closeBook(true);
  //       paper.css("z-index", numberOfPages);
  //       paper.removeClass("flipped");
  //     } else if (currentLocation === numberOfPages + 1) {
  //       paper.css("z-index", "1");
  //       paper.removeClass("flipped");
  //       openBook();
  //     } else {
  //       paper.css("z-index", currentLocation - 1);
  //       paper.removeClass("flipped");
  //     }
  //     setCurrentLocation(currentLocation - 1);
  //   }
  // }

  return (
    <>
      {score / (numberOfPages - 1) >= 0.5 && isFinished && (
        <Confetti width={width} height={height} />
      )}
      <AnimatePresence>
        {!isGameStarted && (
          <motion.div
            className="flex justify-center items-center h-[80dvh] w-full scale-75 sm:scale-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
          >
            <div className="container absolute h-[80dvh] aspect-[7/10] w-fit flex items-center justify-center">
              <div className="book relative">
                <div className="cover items-center flex justify-center relative h-full z-[1] duration-1000">
                  <Image
                    width={700}
                    height={1000}
                    src="/coi-cover.jpg"
                    alt="cover"
                    className="object-cover h-full w-full"
                  />
                </div>
                {!isPlayClicked ? (
                  <div className="details absolute border top-0 w-full h-full flex flex-col gap-2 items-center justify-center">
                    <h1 className="text-3xl font-bold text-center">
                      Constitution of India, Click Play to Start
                    </h1>
                    <Button
                      onClick={() => setIsPlayClicked(true)}
                      className="text-3xl h-fit"
                    >
                      Play
                    </Button>
                  </div>
                ) : (
                  <div className="details absolute border top-0 w-full h-full flex-col flex items-center justify-center">
                    <p>
                      <span className="text-3xl font-bold">
                        Choose difficulty
                      </span>
                    </p>
                    <Button
                      onClick={() => {
                        setIsGameStarted(true);
                        setNumberOfPages(4);
                        generateRandomArticles(3);
                      }}
                      className="text-2xl h-fit"
                    >
                      Easy
                    </Button>
                    <Button
                      onClick={() => {
                        setIsGameStarted(true);
                        setNumberOfPages(6);
                        generateRandomArticles(5);
                      }}
                      className="text-2xl h-fit"
                    >
                      Medium
                    </Button>
                    <Button
                      onClick={() => {
                        setIsGameStarted(true);
                        setNumberOfPages(8);
                        generateRandomArticles(7);
                      }}
                      className="text-2xl h-fit"
                    >
                      Hard
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
        {isGameStarted && (
          <motion.div
            className="flex justify-center scale-[.38] sm:scale-50 md:scale-75 lg:scale-90 xl:scale-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
          >
            {/* <button
              id="prev-btn"
              onClick={() => {
                goPrevPage();
              }}
              className="z-10"
            >
              <ArrowLeftCircleIcon />
            </button> */}
            <div
              id="book"
              className="relative h-[80dvh] aspect-[7/10] transition-transform duration-500"
            >
              {myArray.map((_, index) => {
                const paperId = "p" + (index + 1);
                const frontId = "f" + (index + 1);
                const backId = "b" + (index + 1);
                return (
                  <div
                    key={paperId}
                    id={paperId}
                    className="paper absolute w-full inset-0"
                  >
                    <div className="front bg-white absolute w-full h-full inset-0 transition-transform duration-500 border z-[1] border-l-[3px] border-[#b0e0e6]">
                      <div
                        id={frontId}
                        className="front-content border flex w-full h-full items-center justify-center"
                      >
                        <div className="flex w-full relative item-center justify-center h-full flex-col px-4 py-8 overflow-hidden">
                          {index === 0 ? (
                            <>
                              <h1 className="text-6xl font-bold text-center">
                                {"Let's Start"}
                              </h1>
                              <p>
                                Rule: You have to tell the article number of the
                                given article.
                              </p>
                              <Button
                                onClick={() => {
                                  goNextPage();
                                }}
                                className="text-2xl h-fit absolute bottom-0 right-0"
                              >
                                Start
                              </Button>
                            </>
                          ) : (
                            <div className="grid grid-cols-2">
                              {randomArticleNumbers?.[index - 1].map(
                                (articleNumber) => {
                                  return (
                                    <Button
                                      key={`${index}-${articleNumber}-${Math.random()}`}
                                      onClick={() => {
                                        if (
                                          articleNumber ===
                                          randomArticles?.[index - 1].article
                                        ) {
                                          setScore(score + 1);
                                        }
                                        goNextPage();
                                        if (index === numberOfPages - 1) {
                                          console.log("finished");
                                          setIsFinished(true);
                                        }
                                      }}
                                      className="text-2xl h-fit"
                                    >
                                      {articleNumber}
                                    </Button>
                                  );
                                }
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="back bg-white absolute w-full h-full inset-0 transition-transform duration-500 border z-0 border-l-[3px] border-[#b0e0e6]">
                      <div
                        id={backId}
                        className="back-content flex border w-full h-full items-center justify-center"
                      >
                        <div className="flex w-full gap-6 relative h-full flex-col px-4 py-8 overflow-auto">
                          {index !== numberOfPages - 1 && randomArticles ? (
                            <>
                              <h1 className="text-6xl font-bold text-center">
                                {"Question " + (index + 1)}
                              </h1>
                              {/* <p className="text-2xl text-center">
                                <span className="font-bold">
                                  Article Number:{" "}
                                </span>
                                {randomArticles[index].article}
                              </p> */}
                              <p className="text-2xl text-center">
                                <span className="font-bold">
                                  Article Title:{" "}
                                </span>
                                {randomArticles[index].title}
                              </p>
                              <p className="text-xl text-center ">
                                <span className="font-bold">
                                  Article Description:{" "}
                                </span>
                                {randomArticles[index].description.replace(
                                  /(\r\n|\n|\r)/gm,
                                  ""
                                )}
                              </p>
                            </>
                          ) : (
                            <>
                              <h1 className="text-6xl font-bold text-center">
                                You scored {score} out of {numberOfPages - 1}
                              </h1>
                              <Button
                                onClick={() => {
                                  window.location.reload();
                                }}
                                className="text-2xl h-fit"
                              >
                                Play Again
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* <button
              id="next-btn"
              onClick={() => {
                goNextPage();
              }}
              className="z-10"
            >
              <ArrowRightCircleIcon />
            </button> */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
