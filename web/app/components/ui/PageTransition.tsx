"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useRef, useContext, ReactNode } from "react";

// import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context"
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { publish } from "pubsub-js";

function FrozenRouter(props: PropsWithChildren<{}>) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

// Client wraps any client/rsc components with AnimatePresence
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const _onStart = () => {
    publish("PAGE_TRANSITION_START");
  };
  const _onComplete = () => {
    publish("PAGE_TRANSITION_END");
  };
  return (
    <AnimatePresence mode='wait' onExitComplete={_onComplete}>
      <motion.div
        key={pathname}
        onAnimationStart={_onStart}
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.2, type: "tween" }}>
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
