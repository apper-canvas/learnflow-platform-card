const { ApperClient } = window.ApperSDK;

// Initialize ApperClient with Project ID and Public Key
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const TABLE_NAME = 'enrollment';

// Field names for enrollment table - only updateable fields for create/update
const UPDATEABLE_FIELDS = [
  'Name', 'Tags', 'course_name', 'instructor', 'price', 'first_name', 'last_name',
  'email', 'phone', 'date_of_birth', 'address', 'city', 'state', 'zip_code',
  'country', 'emergency_contact_name', 'emergency_contact_phone', 
  'emergency_contact_relation', 'previous_education', 'learning_goals',
  'terms_accepted', 'enrollment_date', 'course'
];

// All fields for fetch operations
const ALL_FIELDS = [
  'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
  'course_name', 'instructor', 'price', 'first_name', 'last_name', 'email', 'phone',
  'date_of_birth', 'address', 'city', 'state', 'zip_code', 'country',
  'emergency_contact_name', 'emergency_contact_phone', 'emergency_contact_relation',
  'previous_education', 'learning_goals', 'terms_accepted', 'enrollment_date', 'course'
];

export const fetchAllEnrollments = async (filters = {}) => {
  try {
    const params = {
      fields: ALL_FIELDS,
      pagingInfo: {
        limit: filters.limit || 20,
        offset: filters.offset || 0
      }
    };

    // Add filtering if provided
    if (filters.courseId) {
      params.where = [{
        fieldName: 'course',
        operator: 'EqualTo',
        values: [filters.courseId]
      }];
    }

    // Add search functionality
    if (filters.search) {
      const searchConditions = [
        {
          fieldName: 'first_name',
          operator: 'Contains',
          values: [filters.search]
        },
        {
          fieldName: 'last_name',
          operator: 'Contains',
          values: [filters.search]
        },
        {
          fieldName: 'email',
          operator: 'Contains',
          values: [filters.search]
        }
      ];

      if (params.where) {
        params.whereGroups = [{
          operator: 'AND',
          subGroups: [
            {
              conditions: params.where,
              operator: ''
            },
            {
              conditions: searchConditions,
              operator: 'OR'
            }
          ]
        }];
        delete params.where;
      } else {
        params.whereGroups = [{
          operator: 'OR',
          subGroups: [{
            conditions: searchConditions,
            operator: ''
          }]
        }];
      }
    }

    // Add sorting
    if (filters.sortBy) {
      params.orderBy = [{
        fieldName: filters.sortBy,
        SortType: filters.sortOrder || 'DESC'
      }];
    } else {
      // Default sort by enrollment date (newest first)
      params.orderBy = [{
        fieldName: 'enrollment_date',
        SortType: 'DESC'
      }];
    }

    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    
    if (!response || !response.data) {
      return [];
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    throw new Error('Failed to fetch enrollments');
  }
};

export const getEnrollmentById = async (enrollmentId) => {
  try {
    const params = {
      fields: ALL_FIELDS
    };

    const response = await apperClient.getRecordById(TABLE_NAME, enrollmentId, params);
    
    if (!response || !response.data) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching enrollment with ID ${enrollmentId}:`, error);
    throw new Error('Failed to fetch enrollment details');
  }
};

export const createEnrollment = async (enrollmentData) => {
  try {
    // Filter to only include updateable fields
    const filteredData = {};
    UPDATEABLE_FIELDS.forEach(field => {
      if (enrollmentData.hasOwnProperty(field)) {
        filteredData[field] = enrollmentData[field];
      }
    });

    // Format data types properly
    if (filteredData.price) {
      filteredData.price = parseFloat(filteredData.price);
    }
    if (filteredData.date_of_birth) {
      // Ensure date is in proper format (YYYY-MM-DD)
      filteredData.date_of_birth = new Date(filteredData.date_of_birth).toISOString().split('T')[0];
    }
    if (filteredData.enrollment_date) {
      // Ensure datetime is in proper format
      filteredData.enrollment_date = new Date(filteredData.enrollment_date).toISOString();
    }
    if (filteredData.terms_accepted) {
      // Convert boolean/checkbox to proper format
      filteredData.terms_accepted = filteredData.terms_accepted ? "accepted" : "";
    }

    // Map form field names to database field names
    const fieldMapping = {
      firstName: 'first_name',
      lastName: 'last_name',
      dateOfBirth: 'date_of_birth',
      zipCode: 'zip_code',
      emergencyContactName: 'emergency_contact_name',
      emergencyContactPhone: 'emergency_contact_phone',
      emergencyContactRelation: 'emergency_contact_relation',
      previousEducation: 'previous_education',
      learningGoals: 'learning_goals',
      termsAccepted: 'terms_accepted',
      enrollmentDate: 'enrollment_date',
      courseName: 'course_name',
      courseId: 'course'
    };

    // Apply field mapping
    Object.keys(fieldMapping).forEach(formField => {
      if (enrollmentData.hasOwnProperty(formField)) {
        const dbField = fieldMapping[formField];
        if (UPDATEABLE_FIELDS.includes(dbField)) {
          filteredData[dbField] = enrollmentData[formField];
          // Format the mapped data properly
          if (dbField === 'date_of_birth' && filteredData[dbField]) {
            filteredData[dbField] = new Date(filteredData[dbField]).toISOString().split('T')[0];
          }
          if (dbField === 'enrollment_date' && filteredData[dbField]) {
            filteredData[dbField] = new Date(filteredData[dbField]).toISOString();
          }
          if (dbField === 'terms_accepted') {
            filteredData[dbField] = filteredData[dbField] ? "accepted" : "";
          }
          if (dbField === 'price') {
            filteredData[dbField] = parseFloat(filteredData[dbField]) || 0;
          }
        }
      }
    });

    const params = {
      records: [filteredData]
    };

    const response = await apperClient.createRecord(TABLE_NAME, params);
    
    if (response && response.success && response.results) {
      const successfulRecords = response.results.filter(result => result.success);
      if (successfulRecords.length > 0) {
        return successfulRecords[0].data;
      }
    }
    
    throw new Error('Failed to create enrollment');
  } catch (error) {
    console.error('Error creating enrollment:', error);
    throw new Error('Failed to create enrollment');
  }
};

export const updateEnrollment = async (enrollmentId, updateData) => {
  try {
    // Filter to only include updateable fields
    const filteredData = { Id: enrollmentId };
    UPDATEABLE_FIELDS.forEach(field => {
      if (updateData.hasOwnProperty(field)) {
        filteredData[field] = updateData[field];
      }
    });

    // Format data types properly
    if (filteredData.price) {
      filteredData.price = parseFloat(filteredData.price);
    }
    if (filteredData.date_of_birth) {
      filteredData.date_of_birth = new Date(filteredData.date_of_birth).toISOString().split('T')[0];
    }
    if (filteredData.enrollment_date) {
      filteredData.enrollment_date = new Date(filteredData.enrollment_date).toISOString();
    }
    if (filteredData.terms_accepted) {
      filteredData.terms_accepted = filteredData.terms_accepted ? "accepted" : "";
    }

    const params = {
      records: [filteredData]
    };

    const response = await apperClient.updateRecord(TABLE_NAME, params);
    
    if (response && response.success && response.results) {
      const successfulUpdates = response.results.filter(result => result.success);
      if (successfulUpdates.length > 0) {
        return successfulUpdates[0].data;
      }
    }
    
    throw new Error('Failed to update enrollment');
  } catch (error) {
    console.error('Error updating enrollment:', error);
    throw new Error('Failed to update enrollment');
  }
};

export const deleteEnrollment = async (enrollmentIds) => {
  try {
    const ids = Array.isArray(enrollmentIds) ? enrollmentIds : [enrollmentIds];
    
    const params = {
      RecordIds: ids
    };

    const response = await apperClient.deleteRecord(TABLE_NAME, params);
    
    if (response && response.success) {
      return true;
    }
    
    throw new Error('Failed to delete enrollment(s)');
  } catch (error) {
    console.error('Error deleting enrollment(s):', error);
    throw new Error('Failed to delete enrollment(s)');
  }
};

// Legacy methods for backward compatibility
export const getAll = fetchAllEnrollments;
export const getById = getEnrollmentById;
export const create = createEnrollment;
export const update = updateEnrollment;
export const delete_ = deleteEnrollment;