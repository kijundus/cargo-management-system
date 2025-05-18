<!-- src/routes/dashboard/+page.svelte -->
<script>
  import { goto } from '$app/navigation';
  import { pricing } from '$lib/stores/pricing';

  // Mock shipments data
  let shipments = [
    { id: 1, productName: "Glassware", isFragile: true, route: "darToZanzibar", price: pricing.darToZanzibar.fragile },
    { id: 2, productName: "Clothing", isFragile: false, route: "zanzibarToDar", price: pricing.zanzibarToDar.nonFragile },
  ];
</script>

<h1>Your Shipments</h1>

<table>
  <thead>
    <tr>
      <th>Product</th>
      <th>Type</th>
      <th>Route</th>
      <th>Price (TZS)</th>
    </tr>
  </thead>
  <tbody>
    {#each shipments as shipment}
      <tr>
        <td>{shipment.productName}</td>
        <td>{shipment.isFragile ? "Fragile" : "Non-Fragile"}</td>
        <td>
          {shipment.route === "darToZanzibar" 
            ? "Dar → Zanzibar" 
            : "Zanzibar → Dar"}
        </td>
        <td>{shipment.price.toLocaleString()}</td>
      </tr>
    {/each}
  </tbody>
</table>

<button on:click={() => goto('/shipments')}>New Shipment</button>