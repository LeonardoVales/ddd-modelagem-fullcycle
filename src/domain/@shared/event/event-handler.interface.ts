import EventInterface from "./event.interface";

/**
 * <T extends EventInterface=EventInterface
 * O valor padrão do meu T é EventInterface
 */
export default interface EventHandlerInterface<T extends EventInterface=EventInterface> {
  handle(event: T): void
}