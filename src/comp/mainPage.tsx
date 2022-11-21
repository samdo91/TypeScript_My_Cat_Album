import React, { useState, useEffect } from "react";
import Breadcrumb from "./breadcrumb/breadcrumb";
import Node from "./node/node";
import { listApiFuntion } from "./store/api/api";
import ImgPage from "./imgPage/imgPage";

export interface IcatState {
  isRoots: boolean;
  depth: Tnode[];
  nodes: Tnode[];
  isLoadimg: null | boolean;
  isImag: null | boolean;
  imgSrc: string | undefined;
}

export type Tnode = {
  id: number | undefined;
  name: string;
  type: string;
};

function MainPage() {
  const [catState, setCatState] = useState<IcatState>({
    isRoots: false,
    depth: [],
    nodes: [],
    isLoadimg: false,
    isImag: null,
    imgSrc: undefined,
  });

  useEffect(() => {
    try {
      const catList = async () => {
        const catList = await listApiFuntion(null);

        setCatState({
          ...catState,
          nodes: catList,
        });
      };

      catList();
    } catch (e) {
      console.log();
    } finally {
    }
  }, []);
  return (
    <div>
      <title> 고양이보고가세요! </title>
      <h1> 고양이 보고 가!!</h1>
      <Breadcrumb catState={catState} setCatState={setCatState} />
      <Node catState={catState} setCatState={setCatState} />
      <ImgPage catState={catState} setCatState={setCatState} />
    </div>
  );
}

export default MainPage;
function async() {
  throw new Error("Function not implemented.");
}
