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
          display: "flex", // Usar flex para un layout horizontal
          gap: "16px", // Espaciado entre los elementos arrastrables
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
  const {
    setNodeRef: setDraggableRef,
    listeners,
    attributes,
    transform,
    isDragging,
  } = useDraggable({ id });

  const { setNodeRef: setDroppableRef } = useDroppable({ id });

  const style = {
    transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <div
      ref={(node) => {
        setDraggableRef(node);
        setDroppableRef(node); // Esto no es necesario aquí, pero lo puedes dejar si lo prefieres
      }}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};
