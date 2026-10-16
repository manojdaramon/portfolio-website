import { registerRoot, Composition } from "remotion";
import { WalkinsReelComposition, FPS } from "./WalkinsReelComposition";
import { sampleJobsData } from "./sampleData";

export const Root = () => {
  return (
    <Composition
      id="WalkinsReel"
      component={WalkinsReelComposition}
      durationInFrames={1800} // Dynamic calculation from calculateMetadata
      fps={FPS}
      width={1080}
      height={1920}
      defaultProps={sampleJobsData}
      calculateMetadata={({ props }) => {
        const input = props || sampleJobsData;
        const introFrames = Math.round((input.introDurationSec || 3) * FPS);
        const perJobFrames = Math.round((input.secondsPerJob || 4) * FPS);
        const jobsFrames = (input.jobs || []).length * perJobFrames;
        const ctaFrames = Math.round((input.ctaDurationSec || 4.5) * FPS);
        const durationInFrames = introFrames + jobsFrames + ctaFrames;

        return {
          durationInFrames,
          fps: FPS,
          width: 1080,
          height: 1920
        };
      }}
    />
  );
};

registerRoot(Root);
