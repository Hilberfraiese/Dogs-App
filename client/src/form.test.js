import React from 'react';
import { render } from '@testing-library/react';
import { configure } from 'enzyme';
import CreateDog from './components/createDog/CreateDog';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from "react-redux"
import store from "./store/index"

const ReduxWrapper = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
); 


configure({adapter: new Adapter()});

describe('<CreateDog /> Mounted', () => {
  
  it('El formulario debe tener un label que diga: "Name"', () => {
      const { container } = render(<CreateDog/>, 
        { wrapper: ReduxWrapper },
        );
      const element = container.querySelectorAll('label')[0]
      expect(element.innerHTML).toBe("Name");
  });

  it('El formulario debe tener un input con name "name" y type "text"', () => {
      const { container } = render(<CreateDog />, 
        { wrapper: ReduxWrapper },
        );
      const element = container.querySelectorAll('input')[0]
     expect(element.type).toBe('text');
     expect(element.name).toBe('name');
  });

  it('El formulario debe tener un input con name "height" y type "text"', () => {
    const { container } = render(<CreateDog/>,{ wrapper: ReduxWrapper },);
    const element = container.querySelectorAll('input')[1]
    expect(element.type).toBe('text');
    expect(element.name).toBe('height');
  });

  it('El formulario debe tener un input con name "weight" y type "text"', () => {
    const { container } = render(<CreateDog/>,{ wrapper: ReduxWrapper },);
    const element = container.querySelectorAll('input')[2]
    expect(element.type).toBe('text');
    expect(element.name).toBe('weight');
  });

  it('El formulario debe tener un input con name "life_span" y type "text"', () => {
    const { container } = render(<CreateDog/>,{ wrapper: ReduxWrapper },);
    const element = container.querySelectorAll('input')[3]
    expect(element.type).toBe('text');
    expect(element.name).toBe('life_span');
  });

});