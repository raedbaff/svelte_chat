<script lang="ts" >
    import { onMount } from 'svelte';
    import axios from 'axios';
    import { goto } from '$app/navigation';
    import { session } from '../../lib/session'
    import type {User} from "../../lib/session"
   let formdata={
       email:'',
       password:''
   }
   let responseMessage = '';
   const handleSubmit = async (e: Event) => {
   e.preventDefault();
   try {
     const response = await axios.post("http://localhost:5000/user/login", formdata);
    
     if (response.status === 200) {
            
      const user:User={name:response.data.user.name,LastName:response.data.user.LastName,email:response.data.user.email}
      $session.user=user
       localStorage.setItem("accessToken",response.data.accessToken)
       localStorage.setItem("user",JSON.stringify(response.data.user))
       localStorage.setItem("session",JSON.stringify($session.user))
       goto("/Home")
     
      
     } else {
        console.log("we are here")
       responseMessage = 'Error submitting the form. Please try again.';
       setTimeout(() => {
           responseMessage=''
           
       }, 2000);
     }

   } catch (error:any) {
    if (error.response && error.response.status === 401) {
      
       responseMessage = 'Invalid Credentials, try again';
       setTimeout(() => {
           responseMessage = '';
       }, 2000);
     } else {
       console.error('Error:', error);
       responseMessage = 'An unexpected error occurred. Please try again later.';
     }
   }

 
 };
   onMount(() => {
   console.log(responseMessage);
 });
</script>

<section class="vh-100" style="margin-top:5%">
   <div class="container h-100">
     <div class="row d-flex justify-content-center align-items-center h-100">
       <div class="col-lg-12 col-xl-11">
         <div class="card text-black" style="border-radius: 25px;">
           <div class="card-body p-md-5">
             <div class="row justify-content-center">
               <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
 
                 <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 text-dark ">Login</p>
 
                 <form class="mx-1 mx-md-4" on:submit={handleSubmit}>
 
                
                   <div class="d-flex flex-row align-items-center mb-4">
                     <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                     <div class="form-outline flex-fill mb-0">
                       <input type="email"  class="form-control" bind:value={formdata.email} />
                       <label class="form-label text-dark " for="form3Example3c">Your Email</label>
                     </div>
                   </div>
 
                   <div class="d-flex flex-row align-items-center mb-4">
                     <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                     <div class="form-outline flex-fill mb-0">
                       <input type="password"  class="form-control" bind:value={formdata.password} />
                       <label class="form-label text-dark" for="form3Example4c">Password</label>
                     </div>
                   </div>
 
              
 
                
 
                   <div class="d-flex flex-column  justify-content-center mx-4 mb-3 mb-lg-4">
                     <button type="submit" class="btn btn-primary btn-lg">Login</button>
                     {#if responseMessage !== ''}
                     {@html `<strong style="color:red">${responseMessage}</strong>`}
                   {/if}
                     
                   </div>
    
                 </form>
 
               </div>
            
               <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                   <div style="display:flex;flex-direction:column">
                       <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 text-dark">Welcome to chat app</p>
                       <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                       class="img-fluid" alt="">
                       <a style="text-decoration: none;margin-left:20%" href="/">Don't have an account ? <strong style="color:blue">Register instead</strong></a>

                   </div>
                  
 
                
 
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 </section>