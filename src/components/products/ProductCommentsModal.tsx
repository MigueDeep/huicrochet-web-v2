import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import {
  Button,
  Rating,
  TextField,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const comments = [
  {
    id: 1,
    user: "Ana López",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 4,
    comment: "Muy buen producto, mis hijos lo adoran.",
    date: "2024-11-01",
  },
  {
    id: 2,
    user: "Carlos Mendoza",
    avatar: "https://randomuser.me/api/portraits/men/35.jpg",
    rating: 5,
    comment: "Excelente calidad y precio, ¡muy recomendado!",
    date: "2024-10-28",
  },
  {
    id: 3,
    user: "Sara García",
    avatar: "https://randomuser.me/api/portraits/women/25.jpg",
    rating: 3,
    comment: "El producto es bueno, pero llegó con retraso.",
    date: "2024-10-25",
  },
  {
    id: 4,
    user: "Sara García",
    avatar: "https://randomuser.me/api/portraits/women/25.jpg",
    rating: 3,
    comment: "El producto es bueno, pero llegó con retraso.",
    date: "2024-10-25",
  },
  {
    id: 5,
    user: "Sara García",
    avatar: "https://randomuser.me/api/portraits/women/25.jpg",
    rating: 3,
    comment: "El producto es bueno, pero llegó con retraso.",
    date: "2024-10-25",
  },
];
interface ProductCommentsProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export const ProductCommentsModal = ({
  isOpen,
  onOpenChange,
}: ProductCommentsProps) => {
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} closeButton>
      <ModalContent>
        <ModalHeader className="flex items-center gap-2">
          <Typography variant="h6" className="text-center w-full">
            Comentarios del Producto
          </Typography>
        </ModalHeader>
        <ModalBody className="flex flex-col gap-4 mb-5">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 items-start">
              <Avatar src={comment.avatar} alt={comment.user} />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Typography variant="body1" fontWeight="bold">
                    {comment.user}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {comment.date}
                  </Typography>
                </div>
                <Rating value={comment.rating} readOnly size="small" />
                <Typography variant="body2">{comment.comment}</Typography>
              </div>
            </div>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProductCommentsModal;
