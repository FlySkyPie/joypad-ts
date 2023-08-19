// Events emitter

import { EventEnum, EventMap } from "./constants";

class Emitter {
  events: Record<string, any[]> = {};

  publish(event: any, data: any) {
    if (this.events.hasOwnProperty(event)) {
      this.events[event].forEach((listener: any) => {
        return listener(data);
      });
    }
  }

  subscribe<TEventName extends keyof EventMap & string>(
    event: EventEnum,
    listener: (...eventArg: EventMap[TEventName]) => void
  ) {
    if (!this.events.hasOwnProperty(event)) {
      this.events[event] = [];
    }
    this.events[event].push(listener);

    return {
      unsubscribe: () => {
        const index = this.events[event].indexOf(listener);
        if (index !== -1) this.events[event].splice(index, 1);
      },
    };
  }
}

const emitter = new Emitter();

export default emitter;
