import { Dispatch, SetStateAction } from "react";
import { IcatState } from "../mainPage";
import { listApiFuntion } from "../store/api/api";

// Dispatch<SetStateAction<boolean>>

type Tprops = {
  catState: IcatState;
  setCatState: React.Dispatch<React.SetStateAction<IcatState>>;
  //Dispatch<SetStateAction<여기는 State의 타입>>; setState 타입이란다.
};

function Breadcrumb(props: Tprops) {
  const { catState, setCatState } = props;

  const handleBackDefault = async (e: React.MouseEvent<HTMLDivElement>) => {
    const list = await listApiFuntion(null);
    setCatState({
      ...catState,
      depth: [],
      nodes: list,
      isRoots: false,
    });
  };

  const handlebackDirectory = async (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const { id, length } = target.dataset;
    const nodeId: any = id;
    const lengths = Number(length) + 1;
    const list = await listApiFuntion(nodeId);
    const depthList =
      catState.depth.length === lengths
        ? catState.depth
        : catState.depth.slice(0, lengths);

    setCatState({
      ...catState,
      nodes: list,
      depth: depthList,
    });

    // target.innerHTMLs
  };
  return (
    <nav className="breadcrumb">
      <div onClick={handleBackDefault}>Root</div>
      {catState.depth.length > 0
        ? catState.depth.map((node, index) => {
            return (
              <div
                onClick={handlebackDirectory}
                data-id={node.id}
                data-length={index}
                key={index}
              >
                {node.name}
              </div>
            );
          })
        : ""}
    </nav>
  );
}

export default Breadcrumb;
