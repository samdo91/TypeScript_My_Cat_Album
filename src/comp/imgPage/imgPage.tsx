import { IcatState } from "../mainPage";
type Tprops = {
  catState: IcatState;
  setCatState: React.Dispatch<React.SetStateAction<IcatState>>;
};

function ImgPage(props: Tprops) {
  const { catState, setCatState } = props;

  const handleCancelImg = (e: React.MouseEvent<HTMLDivElement>) => {
    setCatState({
      ...catState,
      isImag: null,
      imgSrc: undefined,
    });
  };

  return (
    <div>
      {catState.isImag ? (
        <div onClick={handleCancelImg}>
          <img src={catState.imgSrc} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default ImgPage;
