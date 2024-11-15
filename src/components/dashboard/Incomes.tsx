import React, { useState, useEffect } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { CardIncomes } from "./CardIncomes";

interface CardStatsProps {
  id: string;
  title: string;
  money: number;
  data: number[];
}

const LOCAL_STORAGE_KEY = "incomes_cards";

const Incomes = () => {
  const defaultCards: CardStatsProps[] = [
    {
      id: "daily",
      title: "Ingresos diarios",
      money: 33,
      data: [2, 5.5, 2, 8.5, 1.5, 5],
    },
    {
      id: "weekly",
      title: "Ingresos semanales",
      money: 210,
      data: [2, 5.5, 2, 8.5, 1.5, 5],
    },
    {
      id: "monthly",
      title: "Ingresos mensuales",
      money: 900,
      data: [2, 5.5, 2, 8.5, 1.5, 5],
    },
    {
      id: "yearly",
      title: "Ingresos anuales",
      money: 12000,
      data: [2, 5.5, 2, 8.5, 1.5, 5],
    },
  ];

  const [cards, setCards] = useState<CardStatsProps[]>(() => {
    // Restaurar desde localStorage o usar valores predeterminados
    const savedCards = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedCards ? JSON.parse(savedCards) : defaultCards;
  });

  const [activeId, setActiveId] = useState<string | null>(null);

  // Guardar datos en localStorage cada vez que cambien las tarjetas
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = cards.findIndex((card) => card.id === active.id);
    const newIndex = cards.findIndex((card) => card.id === over.id);

    if (oldIndex !== newIndex) {
      setCards((prev) => arrayMove(prev, oldIndex, newIndex));
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
          position: "relative",
        }}
      >
        {cards.map((card) => (
          <Droppable key={card.id} id={card.id}>
            <Draggable id={card.id}>
              <CardIncomes
                title={card.title}
                money={card.money}
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
    useDraggable({ id });

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

export default Incomes;
