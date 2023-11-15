<script>
    let counter=10
   function add(){
    counter++
   }
</script>
<style>
    .yes {
        display: flex;
        flex-direction: column;
    }

</style>
<div class="yes">
<strong>Here is the much anticiated counter {counter}</strong> <br>
<button on:click={add}>Click to add more </button>
</div>