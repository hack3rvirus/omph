import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth'
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore'
import { auth, db } from './firebase'

export interface UserRole {
  uid: string
  email: string
  role: 'super_admin' | 'admin' | 'editor' | 'moderator'
  name: string
  association?: string
  createdAt: Date
  lastLogin: Date
}

// Default admin user for initial setup
const DEFAULT_ADMIN = {
  email: 'chaplain@aaua.edu.ng',
  password: 'OurMotherOfPerpetualHelp2025!',
  name: 'Rev. Fr. Chaplain',
  role: 'super_admin' as const
}

// Sign in user
export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    
    // Update last login
    const userDoc = doc(db, 'users', userCredential.user.uid)
    await setDoc(userDoc, { lastLogin: new Date() }, { merge: true })
    
    return userCredential.user
  } catch (error: any) {
    // If default admin doesn't exist, create it
    if (email === DEFAULT_ADMIN.email && error.code === 'auth/user-not-found') {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        
        // Create admin profile
        const adminProfile: UserRole = {
          uid: userCredential.user.uid,
          email: DEFAULT_ADMIN.email,
          role: DEFAULT_ADMIN.role,
          name: DEFAULT_ADMIN.name,
          createdAt: new Date(),
          lastLogin: new Date()
        }
        
        await setDoc(doc(db, 'users', userCredential.user.uid), adminProfile)
        
        return userCredential.user
      } catch (createError: any) {
        throw new Error(createError.message)
      }
    }
    throw new Error(error.message)
  }
}

// Create new user (admin only)
export const createUser = async (
  email: string, 
  password: string, 
  role: UserRole['role'],
  name: string,
  association?: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    
    // Create user profile
    const userProfile: UserRole = {
      uid: userCredential.user.uid,
      email,
      role,
      name,
      association,
      createdAt: new Date(),
      lastLogin: new Date()
    }
    
    await setDoc(doc(db, 'users', userCredential.user.uid), userProfile)
    
    return userCredential.user
  } catch (error: any) {
    throw new Error(error.message)
  }
}

// Get user role
export const getUserRole = async (uid: string): Promise<UserRole | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid))
    if (userDoc.exists()) {
      const data = userDoc.data()
      return {
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        lastLogin: data.lastLogin?.toDate() || new Date()
      } as UserRole
    }
    return null
  } catch (error) {
    console.error('Error getting user role:', error)
    return null
  }
}

// Sign out user
export const signOutUser = async () => {
  try {
    await signOut(auth)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

// Auth state listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback)
}