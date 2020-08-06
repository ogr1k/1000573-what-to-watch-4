import * as React from "react";
import * as renderer from "react-test-renderer";
import withMainPlayer from "./with-main-player";
import {BrowserRouter} from "react-router-dom";
import {film} from "../../mocks/test-mocks";


interface Props {
  children: React.ReactNode;
}

const MockComponent: React.FunctionComponent<Props> = (props: Props) => {

  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};


const MockComponentWrapped = withMainPlayer(MockComponent);

it(`withMainPlayer rendered correctly`, () => {


  const tree = renderer.create(
      <BrowserRouter>
        <MockComponentWrapped film={film}/>
      </BrowserRouter>, {
        createNodeMock() {
          return {};
        }
      }
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
