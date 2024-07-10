import { YStack, Avatar, XStack, Button } from 'tamagui'
import { useEmailContext } from 'app/components/EmailComponent';
import { AlertDialogBtn } from 'app/components/AlertDialog';
import { tokenHook } from 'app/components/tokenHook';
import { router, useRouter } from 'expo-router';

/* task:
 * using the user's profile, store the id, then call delete user using the id
 */
/* This asynchronous function makes a DELETE request to my express API 
 * hosted on Vercel. This function will send a request to
 * the API which then communicates with the MongoDB database
 * to delete a specified user from the database. This function 
 * takes in a userId stored in the MongoDB DB. */
const deleteUser = async(id): Promise<any> => {
    try {
      const result = await fetch(`https://music-app-api-sand.vercel.app/users/${id}`, {
        method: "DELETE", headers: {'Content-Type': 'application/json' }
      });
      return await result.json();
    } catch (error) {
      console.error('Detailed error:', error);
      throw error;
    }
}

/* This asynchronous function makes a call to my Express API
 * to fetch a user based on email. This function takes in
 * a string and returns a Promise of type any. */
const getUser = async(userEmail: string): Promise<any> => {
  try {
    const result = await fetch(`https://music-app-api-sand.vercel.app/users/${userEmail}`, {
      method: "GET", headers: {'Content-Type': 'application/json' }
    });
    return await result.json();
  } catch (error) {
    console.error('Detailed error:', error);
    throw error;
  }
}

/* This function combines the getUser and deleteUser API
 * calls to delete a user from the DB. This function 
 * takes in a string argument. */
const deleteUserFromDB = async(userEmail: string) => {
  try {
    console.log("deleting acc");
    const userProfile = await getUser(userEmail);
    const userId = userProfile[0]._id;
    await deleteUser(userId);
  } catch (error) {
    throw error;
  }
}


/* This function handles the functionality
 * for the profile screen. A user should be able to
 * clear their playlists, delete their account, and/or
 * log out of their account. This function takes in no
 * arguments and returns JSX markup. */
const ProfileScreen = () => {
  const { email } = useEmailContext();
  const { clearToken } = tokenHook();
  
  /* Clear token, redirect to sign in page */
  const logOut = async () => {
    clearToken;
    router.replace('/(auth)');
    console.log("router replaced");
  }

  return (
    <YStack f={1} gap="$12" pt="$7" ai="center">
        <XStack alignItems="center" space="$6">
            <Avatar circular size="$15">
                <Avatar.Image
                accessibilityLabel="Nate Wienert"
                src={require('../../assets/images/goat.jpeg')}
                // src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
                />
                <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
            </Avatar>
        </XStack>

        <YStack gap="$6">
            <Button themeInverse size="$6" backgroundColor="black" width={200} minWidth={200}>
                Clear Playlists
            </Button>
            {/* <Button themeInverse size="$6" backgroundColor="black" width={200} minWidth={200} onPress={() => deleteUserFromDB(email)}> 
                Delete Account
            </Button> */}
            <AlertDialogBtn func={() => deleteUserFromDB(email)} />
            <Button themeInverse size="$6" backgroundColor="black" width={200} minWidth={200} onPress={logOut}>
                Log out
            </Button>
         </YStack>
    </YStack> 
  )
}

export default ProfileScreen;