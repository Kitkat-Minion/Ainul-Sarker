import Globe from "./homeComponent/globe";
import AinulInfo from "./homeComponent/ainulInfo/ainul";
import DiagonalRocketScroll from "./homeComponent/DiagonalRocketScroll";

export default function Home() {
  return (
    <div className="">
      <AinulInfo />
      <Globe />
      <DiagonalRocketScroll />
    </div>
  );
}
