class ValidateClients < ActiveRecord::Migration[5.0]
  def up
    # note that there are additional checks in the model

  	#city and province are not required for now
  	change_column :clients, :last_name, :string, :limit => 30
    change_column_null :clients, :last_name, true

  	change_column :clients, :first_name, :string, :limit => 30
    change_column_null :clients, :first_name, true

 	  change_column :clients, :email, :string, :limit => 30
 	  change_column_null :clients, :email, false
 	  add_index :clients, :email, unique: true

 	  change_column :clients, :phone_number, :string, :limit => 12
  	change_column_null :clients, :phone_number, false

  	change_column :clients, :street_number, :integer
  	change_column_null :clients, :street_number, false
 
  	change_column :clients, :street_name, :string, :limit => 30
  	change_column_null :clients, :street_name, false

  	change_column :clients, :city, :string, :limit => 30
  
  	change_column :clients, :province, :string, :limit => 30

  	change_column :clients, :postal_code, :string, :limit => 7
  	change_column_null :clients, :postal_code, false
	end
  
  def down
  	change_column :clients, :last_name, :string, :limit => nil
    change_column_null :clients, :last_name, true

  	change_column :clients, :first_name, :string, :limit => nil
    change_column_null :clients, :first_name, true

  	change_column :clients, :email, :string, :limit => nil
  	change_column_null :clients, :email, true
  	remove_index :clients, column: :email

  	change_column :clients, :phone_number, :string, :limit => nil
  	change_column_null :clients, :phone_number, true

  	change_column_null :clients, :street_number, true

  	change_column :clients, :street_name, :string, :limit => nil
  	change_column_null :clients, :street_name, true
  
  	change_column :clients, :city, :string, :limit => nil
  
  	change_column :clients, :province, :string, :limit => nil
  	
  	change_column :clients, :postal_code, :string, :limit => nil
  	change_column_null :clients, :postal_code, true
  end
end
