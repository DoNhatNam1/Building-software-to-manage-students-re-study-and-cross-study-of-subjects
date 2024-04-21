import styles from "@/utils/style";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import CoffleImg from '../../../public/e5bef75aa55c98d8a698fe9c840157ea223d3490e2c7a82214d9794716855b8b.svg'
import PiggyImg from '../../../public/02ce04b26b147aa4b319028da1536388583893128b2e45fe6009b46ce2995235.svg'
import CheckGreenImg from '../../../public/9fb9763611598b43ae4d2e4be85923044371c9e1f14756da0c886c88c68102af.svg'
import ShopStoreImg from '../../../public/92104edf6dbef4ff7ef3030c3dd6ffac273901b537b82ecaefef1115db0713bd.svg'
import FashionStoreImg from '../../../public/e86dcfc32d187605bb88f3cbbd49fbc7470982aa71777aa8f798fed8afede0a4.svg'
import TshirtImg from '../../../public/2cdbd131693bc03d909eefeb07b813e397ca0bf5aace3eda7fbfc110116a947d.svg'
import GlassImg from '../../../public/9683bcde820416b3b34f4209fec615fee04925ee07026a9e61509665fa1942e2.svg'

const Hero = () => {
  return (
    <>
    <div className="w-full h-[100vh] banner flex items-center z-10 absolute">
      <div className="backdrop_shaders w-full" />
      <div className="w-[80%] m-auto">
        <h1 className="text-4xl text-[#1398f8f1] py-5 xl:text-6xl font-[800] xl:leading-[80px] sm:mt-20 font-Inter">
          Chào mừng đến với WeldingSchool<br />
          <span className="text-slate-200 font-Poppins font-[600] text-3xl">
            Chúng tôi sẽ giúp bạn tìm hiểu về ngôi trường của chúng tôi
          </span>
        </h1>
        <p className={`${styles.label} !text-[18px]`}>
          Ở đây, chúng tôi coi trọng và đề cao giáo dục và chất lượng trong học tập 
          <br /> đối với từng em sinh viên.
        </p>
        <br />
        <Button className={`${styles.button} w-[180px] font-semibold md:mb-12`}>
          Xem thêm
        </Button>
      </div>
    </div>
    <div className="mt-[770px] flex flex-col">
    <div className="text-white mb-20 text-3xl font-medium self-center mt-20 max-md:max-w-full max-md:mt-10">
    Ngành đào tạo trung tâm phổ thông cao đẳng Welding School 
   </div>
    </div>
   </>
  );
};

export default Hero;
