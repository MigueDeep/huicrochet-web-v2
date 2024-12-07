import React, { useState, useEffect } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { CardIncomes } from "./CardIncomes";
import { DashboardService } from "../../service/DashboardService";

const Views = () => {
  const [cards, setCards] = useState<any[]>([
    { title: "Ingresos del dia", revenues: 0, data: [0, 0, 0, 0] },
    { title: "Ingresos de la semana", revenues: 0, data: [0, 0, 0, 0] },
    { title: "Ingresos del mes", revenues: 0, data: [0, 0, 0, 0] },
    { title: "Ingresos anuales", revenues: 0, data: [0, 0, 0, 0] },
  ]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const fetchViewsStats = async () => {
    setLoading(true);
    try {
      const response = await DashboardService.getIncomesStas();
      if (response?.data) {
        setCards(response.data);
        console.log(response.data);
      } else {
        throw new Error("No se encontraron datos.");
      }
    } catch (err) {
      setError("Error al obtener los datos de las visitas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchViewsStats();
    const interval = setInterval(fetchViewsStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = cards.findIndex((card) => card.title === active.id);
    const newIndex = cards.findIndex((card) => card.title === over.id);

    if (oldIndex !== newIndex) {
      setCards((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  const handleDragEnd = () => {
    setActiveId(null);
  };

  if (error) {
    return <div>{error}</div>;
  }

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
        {cards.map((card: any) => (
          <Droppable key={card.title} id={card.title}>
            <Draggable id={card.title}>
              <CardIncomes
                title={card.title}
                money={card.revenues}
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
