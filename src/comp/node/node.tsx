import { IcatState } from "../mainPage";
import directoryImg from "../store/img/assets/directory.png";
import fileImg from "../store/img/assets/file.png";
import BackArrow from "../store/img/assets/prev.png";
import { Tnode } from "../mainPage";
import { listApiFuntion } from "../store/api/api";

type Tprops = {
  catState: IcatState;
  setCatState: React.Dispatch<React.SetStateAction<IcatState>>;
};

function Node(props: Tprops) {
  const { catState, setCatState } = props;

  const handleNodeOnClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
    const nodeId = target.dataset.id;
    const targetNode = catState.nodes.find((node) => node.id === nodeId);
    apiRerender(targetNode);
  };
  const apiRerender = async (node: Tnode | any) => {
    if (node.type === "DIRECTORY") {
      const list = await listApiFuntion(node.id);
      setCatState({
        ...catState,
        depth: [...catState.depth, node],
        nodes: list,
        isRoots: true,
      });
    } else if (node.type === "FILE") {
      const imgSrc = `https://fe-dev-matching-2021-03-serverlessdeploymentbuck-1ooef0cg8h3vq.s3.ap-northeast-2.amazonaws.com/public${node.filePath}`;
      setCatState({ ...catState, isImag: true, imgSrc: imgSrc });
    }
  };

  const nodeTemplate = catState.nodes.map((node, index) => {
    const inconPatch = node.type === "DIRECTORY" ? directoryImg : fileImg;
    return (
      <div
        onClick={handleNodeOnClick}
        key={node.id}
        data-id={node.id}
        className="node"
      >
        <img data-id={node.id} src={inconPatch} />
        <div data-id={node.id}> {node.name}</div>
      </div>
    );
  });

  return (
    <ul className="nodes">
      {catState.isRoots ? (
        <div className="node">
          <img src={BackArrow} />
        </div>
      ) : (
        ""
      )}
      {nodeTemplate}
    </ul>
  );
}

export default Node;
