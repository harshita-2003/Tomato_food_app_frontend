import { useGetMyUser, useUpdateMyUser } from '@/api/MyUserApi'
import UserProfileForm from '@/forms/user_profile_form/UserProfileForm'

const UserProfilePage = () => {
  const { currentUser , isLoading: isGetUserLoading } = useGetMyUser();
  const { updateUser , isLoading: isUpdateUserLoading } = useUpdateMyUser();

  if(isGetUserLoading) {
    <>Loading..</>
  }

  if(!currentUser) {
    return <span>Unable to load user profile</span>
  }


  return <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateUserLoading} />
}

export default UserProfilePage