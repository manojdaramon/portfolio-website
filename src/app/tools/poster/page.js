import PosterClient from "./PosterClient";

export const metadata = {
  title: "Walk-ins Poster Generator | Private Tool",
  robots: {
    index: false,
    follow: false
  }
};

export default function PosterPage() {
  return <PosterClient />;
}
