class ValidateCars < ActiveRecord::Migration[5.0]
  def up
  	#non of the fields can be left empty

  	change_column :cars, :make, :string, :limit => 30
    change_column_null :cars, :make, false

  	change_column :cars, :model, :string, :limit => 30
    change_column_null :cars, :model, false

 	  change_column :cars, :size, :string, :limit => 30
    change_column_null :cars, :size, false

 	  change_column :cars, :interior, :string, :limit => 30
    change_column_null :cars, :interior, false

 	  change_column :cars, :colour, :string, :limit => 30
    change_column_null :cars, :colour, false
	end
  
  def down
  	change_column :cars, :make, :string, :limit => nil
    change_column_null :cars, :make, true

    change_column :cars, :model, :string, :limit => nil
    change_column_null :cars, :model, true

    change_column :cars, :size, :string, :limit => nil
    change_column_null :cars, :size, true

    change_column :cars, :interior, :string, :limit => nil
    change_column_null :cars, :interior, true

    change_column :cars, :colour, :string, :limit => nil
    change_column_null :cars, :colour, true
  end
end

