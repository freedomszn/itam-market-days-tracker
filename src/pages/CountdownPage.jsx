import { useOutletContext } from "react-router-dom";
import Hero from "../components/Hero";
import LogicSection from "../components/LogicSection";

export default function CountdownPage() {
  const { nextMarketDay, todayMarketDay, countdown, onNotify, marketDays } = useOutletContext();

  return (
    <>
      <Hero
        nextMarketDay={nextMarketDay}
        todayMarketDay={todayMarketDay}
        countdown={countdown}
        onNotify={onNotify}
      />
      <LogicSection marketDays={marketDays} />
    </>
  );
}
