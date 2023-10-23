<template>
  <div class="event-table">
    <div class="event-name">Name of event</div>
    <div class="event-details">
      <div class="event-time">Time</div>
      <div class="event-date">Date</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.event-table {
  display: flex;
  width: 80vw;
  margin: auto;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 5px;
  background-color: #f0f0f0;
}

.event-name {
  flex: 2;
  font-weight: bold;
}

.event-details {
  flex: 3;
  display: flex;
  justify-content: space-between;
}

.event-time,
.event-date {
  flex: 1;
  text-align: center;
}
</style>
