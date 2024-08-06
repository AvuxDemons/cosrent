// import Image from "next/image";
// import { FC } from "react";
// import { User } from "next-auth";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { AvatarProps } from "@radix-ui/react-avatar";
// import { FaUser } from "react-icons/fa";

// interface UserAvatarProps extends AvatarProps {
//   user: Pick<User, "image" | "name">;
// }

// const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
//   return (
//     <Avatar {...props}>
//       {user.image ? (
//         <div className="relative aspect-square h-full w-full">
//           <Image
//             fill
//             src={user.image}
//             alt="Profile picture"
//             referrerPolicy="no-referrer"
//             sizes="16"
//           />
//         </div>
//       ) : (
//         <AvatarFallback>
//           <span className="sr-only">{user?.name}</span>
//           <FaUser className="h-4 w-4" />
//         </AvatarFallback>
//       )}
//     </Avatar>
//   );
// };

// export default UserAvatar;
