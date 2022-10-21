import { syncMapTemplate } from "@logux/client";    
import { UserType } from "../../protocol/protocol"    
                                                                                            
export const User = syncMapTemplate<UserType>('users')    
    
