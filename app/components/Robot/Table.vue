<template>
  <div class="table-wrapper">
    <div v-if="tableData?.table_caption" class="table-caption">
      {{ tableData.table_caption }}
    </div>
    
    <div class="table-container">
      <table class="responsive-table">
        <thead v-if="hasHeader">
          <tr>
            <th 
              v-for="(header, index) in headerRow" 
              :key="`header-${index}`"
              :colspan="getCellSpan(0, index, 'col')"
              :rowspan="getCellSpan(0, index, 'row')"
              v-show="!isCellMerged(0, index)"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(row, rowIndex) in bodyRows" 
            :key="`row-${rowIndex}`"
          >
            <td 
              v-for="(cell, colIndex) in row" 
              :key="`cell-${rowIndex}-${colIndex}`"
              :colspan="getCellSpan(rowIndex + (hasHeader ? 1 : 0), colIndex, 'col')"
              :rowspan="getCellSpan(rowIndex + (hasHeader ? 1 : 0), colIndex, 'row')"
              :class="{
                'header-cell': isFirstColHeader && colIndex === 0,
                'merged-cell': isCellMerged(rowIndex + (hasHeader ? 1 : 0), colIndex)
              }"
              :data-label="getDataLabel(colIndex)"
              v-show="!isCellMerged(rowIndex + (hasHeader ? 1 : 0), colIndex)"
            >
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  tableData: {
    type: Object,
    default: () => ({
      cell: [],
      data: [],
      mergeCells: [],
      table_caption: "",
      first_col_is_header: false,
      table_header_choice: "neither",
      first_row_is_table_header: false
    })
  }
});

// Computed properties
const hasHeader = computed(() => {
  return props.tableData?.first_row_is_table_header || 
         props.tableData?.table_header_choice === 'row';
});

const isFirstColHeader = computed(() => {
  return props.tableData?.first_col_is_header || 
         props.tableData?.table_header_choice === 'column';
});

const headerRow = computed(() => {
  if (!hasHeader.value || !props.tableData?.data) return [];
  return props.tableData.data[0] || [];
});

const bodyRows = computed(() => {
  if (!props.tableData?.data) return [];
  if (hasHeader.value) {
    return props.tableData.data.slice(1);
  }
  return props.tableData.data;
});

// Methods
const getCellSpan = (row, col, type) => {
  if (!props.tableData?.mergeCells || props.tableData.mergeCells.length === 0) {
    return 1;
  }
  
  const mergeInfo = props.tableData.mergeCells.find(
    merge => merge.row === row && merge.col === col
  );
  
  if (mergeInfo) {
    return type === 'col' ? mergeInfo.colspan || 1 : mergeInfo.rowspan || 1;
  }
  
  return 1;
};

const isCellMerged = (row, col) => {
  if (!props.tableData?.mergeCells || props.tableData.mergeCells.length === 0) {
    return false;
  }
  
  return props.tableData.mergeCells.some(merge => {
    const rowSpan = merge.rowspan || 1;
    const colSpan = merge.colspan || 1;
    
    return row > merge.row && row < merge.row + rowSpan &&
           col >= merge.col && col < merge.col + colSpan ||
           col > merge.col && col < merge.col + colSpan &&
           row >= merge.row && row < merge.row + rowSpan;
  });
};

const getDataLabel = (colIndex) => {
  if (hasHeader.value && headerRow.value[colIndex]) {
    return headerRow.value[colIndex];
  }
  return `Column ${colIndex + 1}`;
};
</script>

<style scoped>
.table-wrapper {
  width: 100%;
  margin: 1rem 0;
}

.table-caption {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
  text-align: left;
}

.table-container {
  overflow-x: auto;
  background: white;
  border-radius: 8px;
}

.responsive-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  min-width: 300px;
}

.responsive-table thead {
  background: #f3f4f6;
  color: #1a1a1a;
}

.responsive-table thead th {
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.8125rem;
  letter-spacing: 0.025em;
  border-bottom: 2px solid #e5e7eb;
  color: #374151;
}

.responsive-table tbody tr {
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s ease;
}

.responsive-table tbody tr:hover {
  background-color: #f9fafb;
}

.responsive-table tbody tr:last-child {
  border-bottom: none;
}

.responsive-table td {
  padding: 0.75rem;
  color: #374151;
  font-size: 0.8125rem;
}

.responsive-table td.header-cell {
  background: #f9fafb;
  font-weight: 600;
  color: #1a1a1a;
}

.responsive-table td[colspan],
.responsive-table th[colspan] {
  text-align: center;
}

/* Mobile responsive styles */
@media screen and (max-width: 768px) {
  .table-wrapper {
    margin: 0.75rem 0;
  }

  .table-container {
    border-radius: 6px;
  }

  .responsive-table {
    min-width: 100%;
    font-size: 0.8125rem;
  }

  .responsive-table thead {
    display: none;
  }

  .responsive-table tbody tr {
    display: block;
    margin-bottom: 0.75rem;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    overflow: hidden;
  }

  .responsive-table tbody tr:hover {
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .responsive-table td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.625rem 0.875rem;
    border-bottom: 1px solid #f3f4f6;
    text-align: right;
  }

  .responsive-table td:last-child {
    border-bottom: none;
  }

  .responsive-table td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #1a1a1a;
    font-size: 0.75rem;
    letter-spacing: 0.025em;
    margin-right: 0.75rem;
    text-align: left;
    flex: 0 0 45%;
  }

  .responsive-table td.header-cell {
    background: #f3f4f6;
    color: #1a1a1a;
    font-weight: 600;
  }

  .responsive-table td.header-cell::before {
    color: #1a1a1a;
  }

  /* Handle colspan on mobile */
  .responsive-table td[colspan] {
    display: block;
    text-align: center;
    padding: 0.875rem;
    background: #f9fafb;
  }

  .responsive-table td[colspan]::before {
    display: none;
  }
}

/* Tablet responsive styles */
@media screen and (min-width: 769px) and (max-width: 1024px) {
  .responsive-table {
    font-size: 0.8125rem;
  }

  .responsive-table th,
  .responsive-table td {
    padding: 0.625rem;
  }
}

/* Print styles */
@media print {
  .table-container {
    box-shadow: none;
    border: 1px solid #e5e7eb;
  }

  .responsive-table tbody tr:hover {
    background-color: transparent;
  }
}
</style>