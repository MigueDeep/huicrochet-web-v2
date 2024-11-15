import React, { useState, useEffect } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable"; 
import CardStats from "./CardStats";

const Views = () => {
  // Cargar el estado inicial desde localStorage o usar valores por defecto
  const initialCards = JSON.parse(localStorage.getItem("cards") || "null") || [
    {
      id: "daily",
      title: "Visitas diarias",
      visits: 33,
      data: [3.9, 3.9, 3.9, 3.9],
    },
    {
      id: "weekly",
      title: "Visitas semanales",
      visits: 210,
      data: [2, 5.5, 2, 8.5, 1.5, 5],
    },
    {
      id: "monthly",
      title: "Visitas mensuales",
      visits: 900,
      data: [2, 5.5, 2, 8.5, 1.5, 5],
    },
    {
      id: "yearly",
      title: "Visitas anuales",
      visits: 12000,
      data: [2, 5.5, 2, 8.5, 1.5, 5],
    },
  ];

  const [cards, setCards] = useState(initialCards);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Guardar el estado en localStorage al actualizar las tarjetas
  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = cards.findIndex((card: any) => card.id === active.id);
    const newIndex = cards.findIndex((card: any) => card.id === over.id);

    if (oldIndex !== newIndex) {
      setCards((prev: any) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  const handleDragEnd = () => {
    setActiveId(null);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "16px",
          width: "100%",
          position: "relative", // Contexto de posición para que el DragOverlay funcione correctamente
        }}
      >
        {cards.map((card: any) => (
          <Droppable key={card.id} id={card.id}>
            <Draggable id={card.id}>
              <CardStats
                title={card.title}
                visits={card.visits}
                data={card.data}
              />
            </Draggable>
          </Droppable>
        ))}
      </div>
    </DndContext>
  );
};

interface DraggableProps {
  id: string;
  children: React.ReactNode;
}

const Draggable: React.FC<DraggableProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = {
    transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

interface DroppableProps {
  id: string;
  children: React.ReactNode;
}

const Droppable: React.FC<DroppableProps> = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return <div ref={setNodeRef}>{children}</div>;
};

export default Views;
