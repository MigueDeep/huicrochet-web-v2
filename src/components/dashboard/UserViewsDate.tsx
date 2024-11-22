import React, { useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { UsersStats } from "./UsersStats";
import { ViewsDateStats } from "./ViewsDateStats";

export const UserViewsDate = () => {
  const [components, setComponents] = useState([
    { id: "usersStats", component: <UsersStats /> },
    { id: "viewsDateStats", component: <ViewsDateStats /> },
  ]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const oldIndex = components.findIndex((comp) => comp.id === active.id);
    const newIndex = components.findIndex((comp) => comp.id === over.id);

    if (oldIndex !== newIndex) {
      setComponents((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {components.map(({ id, component }) => (
          <DraggableDroppable key={id} id={id}>
            {component}
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

  const style: React.CSSProperties = {
    transform: `translate(0px, ${transform?.y ?? 0}px)`, // Limitar movimiento al eje Y
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
    zIndex: isDragging ? 999 : "auto",
  };

  return (
    <div
      ref={(node) => {
        setDraggableRef(node); // Nodo arrastrable
        setDroppableRef(node); // Nodo dropeable
      }}
      style={style}
      {...listeners}
      {...attributes}
      onPointerDown={(e) => {
        // Permitir clics e interacción en elementos internos
        const target = e.target as HTMLElement;
        if (target.tagName !== "DIV" && target.tagName !== "SECTION") {
          e.stopPropagation();
        }
      }}
    >
      {children}
    </div>
  );
};
