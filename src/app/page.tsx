import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4 m-5">
      <div>
        <Button variant="elevated">I am a button</Button>
      </div>
        <div>
          <Input placeholder="input" />
        </div>
        <div>
          <Progress value={50} />
        </div>
        <div>
          <Textarea placeholder="textarea" />
        </div>
        <div>
          <Checkbox />
        </div>
    </div>
  );
}
