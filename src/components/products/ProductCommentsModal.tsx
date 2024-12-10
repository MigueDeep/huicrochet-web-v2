import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { Rating, Typography, Avatar } from "@mui/material";
import Lottie from "lottie-react";
import animationData from "../../utils/animation.json";
import { Datum } from "../../interfaces/IReview";

interface ProductCommentsProps {
  isOpen: boolean;
  onOpenChange: () => void;
  comments: Datum[];
  isLoading: boolean;
}

export const ProductCommentsModal = ({
  isOpen,
  onOpenChange,
  comments,
  isLoading,
}: ProductCommentsProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} closeButton>
      <ModalContent>
        <ModalHeader className="flex items-center gap-2">
          <Typography variant="h6" className="text-center w-full">
            Comentarios del Producto
          </Typography>
        </ModalHeader>
        <ModalBody className="flex flex-col gap-4 mb-5">
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem 0",
              }}
            >
              <Lottie
                animationData={animationData}
                style={{ width: 100, height: 100 }}
                loop={true}
              />
            </div>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 items-start">
                <Avatar
                  src={
                    comment.user.image
                      ? `http://34.203.104.87:8080/${comment.user.image.imageUri
                          .split("/")
                          .pop()}`
                      : "/default.webp"
                  }
                  alt={comment.user.fullName}
                />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Typography variant="body1" fontWeight="bold">
                      {comment.user.fullName}
                    </Typography>
                    <Rating value={comment.stars} readOnly size="small" />
                  </div>
                  <Typography variant="body2">{comment.review}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(comment.reviewDate).toLocaleDateString()}
                  </Typography>
                </div>
              </div>
            ))
          ) : (
            <Typography
              color="text.secondary"
              align="center"
              style={{ marginTop: "20px" }}
            >
              ✨ No hay comentarios disponibles por ahora. ✨
            </Typography>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProductCommentsModal;
