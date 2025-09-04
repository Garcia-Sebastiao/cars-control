import "@testing-library/jest-dom";

class MockIntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

class MockResizeObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: MockResizeObserver,
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const mockGoogleMaps = {
  maps: {
    Size: jest.fn(),
    LatLng: jest.fn(),
    LatLngBounds: jest.fn(),
    Map: jest.fn(),
    Marker: jest.fn(),
    InfoWindow: jest.fn(),
  },
};

Object.defineProperty(window, "google", {
  writable: true,
  value: mockGoogleMaps,
});

afterEach(() => {
  jest.clearAllMocks();
});
