import { useQuery } from "@tanstack/react-query";
import { styled } from "styled-components";
import { IAPIResponse, getNowPlaying, makeImagePath } from "../api";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
  padding-top: 80px;
`;

const MovieContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const Movie = styled(motion.div)`
  align-items: center;
  padding: 20px 20px;
  color: ${(props) => props.theme.bgColor};
  width: 23%;
  border-radius: 15px;
  margin-bottom: 15px;
`;

const Title = styled.span`
  color: white;
  display: flex;
  text-align: center;
`;

const Imgbox = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 300px;
  border-radius: 30px;
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const movieVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.05,
      duaration: 0.3,
      type: "tween",
    },
  },
};

const MovieModal = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const ModalCover = styled.img`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const ModalTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const ModalOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;
function Nowplaying() {
  const { data, isLoading } = useQuery<IAPIResponse>(
    ["movies", "popular"],
    getNowPlaying
  );
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const popularMatch: PathMatch<string> | null = useMatch(
    "now-playing/movies/:id"
  );
  const clickedMovie =
    popularMatch?.params.id &&
    data?.results.find((movie) => movie.id === +popularMatch.params.id!);

  const onOverlayClick = () => {
    navigate("/now-playing");
  };

  const onBoxClicked = (movieId: number) => {
    navigate(`/now-playing/movies/${movieId}`);
  };

  return (
    <Wrapper>
      <MovieContainer>
        {data?.results.map((movie) => (
          <Movie key={movie.id} onClick={() => onBoxClicked(movie.id)}>
            <Imgbox
              bgPhoto={makeImagePath(movie.poster_path)}
              layoutId={`${movie.id}`}
              whileHover="hover"
              initial="normal"
              variants={movieVariants}
              transition={{ type: "tween" }}
            ></Imgbox>
            <Title>{movie.title}</Title>
          </Movie>
        ))}
      </MovieContainer>
      <AnimatePresence>
        {popularMatch ? (
          <>
            <Overlay
              onClick={() => onOverlayClick()}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <MovieModal
              style={{ top: scrollY.get() + 100 }}
              layoutId={popularMatch.params.id}
            >
              {clickedMovie && (
                <>
                  <ModalCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        clickedMovie.backdrop_path
                      )})`,
                    }}
                  />
                  <ModalTitle>{clickedMovie.title}</ModalTitle>
                  <ModalOverview>{clickedMovie.overview}</ModalOverview>
                </>
              )}
            </MovieModal>
          </>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}
export default Nowplaying;
