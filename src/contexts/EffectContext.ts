import { createContext } from "react";
import { Dummy as DummyEffects } from "../hooks";

/**
 * EffectContext is a React Context that provides effect handlers for the
 * whole app. If we handle all effects with this context, we can test the
 * whole app without mocking service worker and DOM objects.
 */
const EffectContext = createContext(DummyEffects);

export default EffectContext;
