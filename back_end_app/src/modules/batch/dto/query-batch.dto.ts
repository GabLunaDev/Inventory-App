export class QueryBatchDto {
    batch_code?: string;
    
    startDate?: string;
  
    endDate?: string;  

    expiryDateStart?: string;
  
    expiryDateEnd?: string;  
  
    sortOrder?: 'asc' | 'desc';
  }
  