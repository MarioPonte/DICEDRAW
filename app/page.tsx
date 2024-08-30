import Pot from "@/components/Pot";
import { teams } from "./teams";
import Container from "@/components/Container";

export default function Home() {
  return (
    <Container>
      <h1 className="text-center text-xl m-10">League Phase Draw Simulator 2024/2025</h1>
      <div className="flex justify-between">
        <Pot num={1} teams={[teams[0], teams[1], teams[2], teams[3], teams[4], teams[5], teams[6], teams[7], teams[8]]} />
        <Pot num={2} teams={[teams[9], teams[10], teams[11], teams[12], teams[13], teams[14], teams[15], teams[16], teams[17]]} />
        <Pot num={3} teams={[teams[18], teams[19], teams[20], teams[21], teams[22], teams[23], teams[24], teams[25], teams[26]]} />
        <Pot num={4} teams={[teams[27], teams[28], teams[29], teams[30], teams[31], teams[32], teams[33], teams[34], teams[35]]} />
      </div>
    </Container>
  );
}