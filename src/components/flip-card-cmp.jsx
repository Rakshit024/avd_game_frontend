"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const FlipCardCmp = ({ number, flipped }) => {
  return (
    <div className="w-full h-full  perspective">
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-full preserve-3d"
      >
        {/* Front side */}

        <div className="absolute w-full  h-full backface-hidden">
          <Card className="rounded-none bg-white w-full h-full flex items-center justify-center">
            <CardContent>
              <p className="text-xl text-center">{number}</p>
            </CardContent>
          </Card>
        </div>

        {/* Back side */}
        <div className="absolute w-full h-full rotate-y-180  backface-hidden">
          <Card className="rounded-none py-0 border-none w-full h-full overflow-hidden">
            <CardContent className=" px-0">
              <img
                src={`/cut_image/cut_images_rvGIifMY46VwQ/image_part_${number}.png`}
                alt="Mandir"
                className="w-full h-full object-contain"
              />
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCardCmp;
