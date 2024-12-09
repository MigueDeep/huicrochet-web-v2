import { useEffect, useState } from "react";
import { BestSellingProducts } from "./BestSellingProducts";
import { UserViewsDate } from "./UserViewsDate";
import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export const BestSellingUserDate = () => {
  const initialCards = JSON.parse(
    localStorage.getItem("cardsBV") || "null"
  ) || [{ id: "bestSelling" }, { id: "userViewsDate" }];

  const [cards, setCards] = useState(initialCards);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("cardsBV", JSON.stringify(cards));
  }, [cards]);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = cards.findIndex(
      (card: { id: any }) => card.id === active.id
    );
    const newIndex = cards.findIndex(
      (card: { id: any }) => card.id === over.id
    );

    if (oldIndex !== newIndex) {
      setCards((prev: unknown[]) => arrayMove(prev, oldIndex, newIndex));
    }
    setActiveId(null);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{
          display: "flex",
          gap: "16px",
          width: "100%",
          position: "relative",
        }}
      >
        {cards.map((card: any) => (
          <DraggableDroppable key={card.id} id={card.id}>
            {card.id === "bestSelling" ? (
              <BestSellingProducts />
            ) : (
              <UserViewsDate />
            )}
          </DraggableDroppable>
        ))}
      </div>
    </DndContext>
  );
};

interface DraggableDroppableProps {
  id: string;
  children: React.ReactNode;
}

const DraggableDroppable: React.FC<DraggableDroppableProps> = ({
  id,
  children,
}) => {
  const isDraggable = id !== "bestSelling"; // Define si el componente es arrastrable

  const {
    setNodeRef: setDraggableRef,
    listeners,
    attributes,
    transform,
    isDragging,
  } = useDraggable({ id, disabled: !isDraggable }); // Desactiva el comportamiento draggable para "bestSelling"

  const { setNodeRef: setDroppableRef } = useDroppable({ id });

  const style = {
    transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDraggable ? "grab" : "default", // Cambia el cursor según si es arrastrable
  };

  return (
    <div
      ref={(node) => {
        setDraggableRef(node);
        setDroppableRef(node); // Se sigue registrando como área droppable
      }}
      style={style}
      {...(isDraggable ? listeners : {})} // Aplica listeners solo si es arrastrable
      {...(isDraggable ? attributes : {})} // Aplica atributos solo si es arrastrable
    >
      {children}
    </div>
  );
};
