/* istanbul ignore file */
import DistanceBasedGraphController, { DistanceBasedGraphControllerContext } from '../controller/DistanceBasedGraphController';
import FastmapController, { FastmapControllerContext } from '../controller/FastmapController';
import IsomapController, { IsomapControllerContext } from '../controller/IsomapController';
import LleController, { LleControllerContext } from '../controller/LleController';
import LocalLoaderController, { LocalLoaderControllerContext } from '../controller/LocalLoaderController';
import StandardController, { StandardControllerContext } from '../controller/StandardController';
import Store, { StoreContext } from '../store/Store';
import TsneController, { TsneControllerContext } from '../controller/TsneController';
import UmapController, { UmapControllerContext } from '../controller/UmapController';
import React from 'react';
import { render } from '@testing-library/react';

const store = new Store();
const localLoaderController = new LocalLoaderController(store);
const standardController = new StandardController(store);
const fastmapController = new FastmapController(store);
const isomapController = new IsomapController(store);
const lleController = new LleController(store);
const tsneController = new TsneController(store);
const umapController = new UmapController(store);
const distanceBasedController = new DistanceBasedGraphController(store);

const AllTheProviders = ({ children }) => {
	return (
		<StoreContext.Provider value={store}>
			<LocalLoaderControllerContext.Provider value={localLoaderController}>
				<DistanceBasedGraphControllerContext.Provider value={distanceBasedController}>
				<StandardControllerContext.Provider value={standardController}>
				<FastmapControllerContext.Provider value={fastmapController}>
				<IsomapControllerContext.Provider value={isomapController}>
				<LleControllerContext.Provider value={lleController}>
				<TsneControllerContext.Provider value={tsneController}>
				<UmapControllerContext.Provider value={umapController}>
          {children}
        </UmapControllerContext.Provider>
        </TsneControllerContext.Provider>
        </LleControllerContext.Provider>
        </IsomapControllerContext.Provider>
        </FastmapControllerContext.Provider>
        </StandardControllerContext.Provider>
        </DistanceBasedGraphControllerContext.Provider>
      </LocalLoaderControllerContext.Provider>
      </StoreContext.Provider>
	);
};

const customRender = (ui, options) => render(ui, {
  wrapper: AllTheProviders,
  ...options
});

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };