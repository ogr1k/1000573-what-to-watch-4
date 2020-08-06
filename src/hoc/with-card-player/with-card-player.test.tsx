import * as React from "react";
import * as renderer from "react-test-renderer";
import withCardPlayer from "./with-card-player";
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

const MockComponentWrapped = withCardPlayer(MockComponent);

it(`withCardPlayer is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      film={film}/>
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
