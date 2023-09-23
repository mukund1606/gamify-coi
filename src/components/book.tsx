"use client";
import "@/styles/book.css";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";

export default function Book() {
  const [isPlayClicked, setIsPlayClicked] = useState(false);
  return (
    <>
      <AnimatePresence>
        {!isPlayClicked && (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="container absolute h-[80dvh] aspect-[7/10] w-fit">
              <div className="book relative">
                <div className="cover items-center flex justify-center relative h-full z-[1]">
                  <img
                    src="/coi-cover.png"
                    alt="cover"
                    className="object-cover"
                  />
                </div>
                <div className="details absolute border top-0 w-full h-full flex items-center justify-center">
                  <Button
                    onClick={() => setIsPlayClicked(true)}
                    className="text-3xl h-fit"
                  >
                    Play
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
